import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'

// Load Input Validation
import validateRegisterInput from "../validation/register"
import validateLoginInput from "../validation/login"

// Load User interface
import IUser from '../interfaces/User'

// Load User models
import User from '../models/User'


const Register = (req: Request, res: Response) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email, studentId: req.body.studentId }).then((user: IUser | null) => {
        if (user?.email) {
            errors.email = "Email already exists"
            return res.status(400).json(errors.email)
        } else if (user?.studentId) {
            errors.studentId = "studentId already exists"
            return res.status(400).json(errors.studentId)
        } else {
            const newUser: any = new User({
                studentId: req.body.studentId,
                password: req.body.password,
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
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


    })
}

const Login = (req: Request, res: Response) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const studentId: number = req.body.studentId
    const password = req.body.password

    //Find user by student id

    User.findOne({ studentId }).then((user: IUser | null) => {
        //check for user
        if (!user) {
            errors.studentId = "User not found"
            return res.status(404).json(errors)
        }

        //check password
        bcrypt.compare(password, user.password).then((isMatch: boolean) => {
            if (isMatch) {
                // User Matched
                const payload = { id: user.id, studentId: user.studentId }// Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
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

export default { Login, Register }