import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'

// Load Input Validation
import validateRegisterInput from "../validation/register"
import validateLoginInput from "../validation/login"
import isEmpty from '../validation/is-empty'

// Load User models

import { IUser, default as User } from '../models/User'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'


export const Register = (req: Request, res: Response) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    const email: string = req.body.email
    const studentID: number = req.body.studentID
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const checkEmail = () => {
        return User.findOne({ email })
    }

    const checkStudentID = () => {
        return User.findOne({ studentID })
    }

    const checkDuplicate = async () => {
        let dEmail = await checkEmail()
        let dStudentID = await checkStudentID()
        if (dEmail) {
            errors.email = "Email already exists"
        }
        if (dStudentID) {
            errors.studentID = "StudentID already exists"
        }
        return errors
    }


    const createUser = async () => {
        let dbErrors = await checkDuplicate()
        const noDuplicate = isEmpty(dbErrors)
        if (!noDuplicate) {
            console.log(dbErrors)
            return res.status(400).json(dbErrors)

        } else {
            const newUser: IUser = new User({
                studentID: req.body.studentID,
                password: req.body.password,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then((user: any) => res.json(user))
                        .catch((err: any) => console.log(err))
                })
            })
        }
    }

    createUser();
}

export const Login = (req: Request, res: Response) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const studentID: number = req.body.studentID
    const password = req.body.password

    //Find user by student id

    User.findOne({ studentID }).then((user: IUser | null) => {
        //check for user
        if (!user) {
            errors.studentID = "User not found"
            return res.status(404).json(errors)
        }

        //check password
        bcrypt.compare(password, user.password).then((isMatch: boolean) => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, studentID: user.studentID, role: user.role }// Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 9999999999999 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                errors.password = "Password incorrect";
                return res.status(400).json(errors)
            }
        })
    })
}

// @desc    Edit Role
// @route   PUT /api/users/role/edit
// @acess   Private
export const EditRole = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, role } = req.body


    let currentUser = await User.findById(user)
    if (!currentUser) {
        return next(new ErrorResponse(`We don't have this user!`, 400))
    }

    const newUser = {
        studentID: currentUser.studentID,
        password: currentUser.password,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        role: role
    }
    const update = await currentUser.updateOne(newUser)

    let updatedUser = await User.findById(user).select("-password")

    res.status(201).json({
        success: true,
        detail: updatedUser
    });
})

// @desc    Get all user info
// @route   GET /api/users/
// @acess   Private
export const GetUsersInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const search = req.query.search as string
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)


    const queryArray = []
    if (!isEmpty(search)) queryArray.push({ "$or": [{ "firstName": { $regex: search, $options: 'i' } }, { "email": { $regex: search } }] })

    let users
    if (isEmpty(search)) {
        users = await User.find().select("-password")
    } else {
        users = await User.find({ $and: queryArray }).select("-password")
    }

    if (!users) {
        return next(new ErrorResponse(`We don't have any user!`, 404))
    }

    res.status(201).json({
        success: true,
        detail: users
    });
})