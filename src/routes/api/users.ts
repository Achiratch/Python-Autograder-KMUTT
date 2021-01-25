import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import bcrypt from 'bcryptjs'


// Load Input Validation
import validateRegisterInput from "../../validation/register"

// Load User model
import User from "../../models/User";

// @route GET api/users/register
// @desc Register user
// @acccess Public
router.post("/register", (req: Request, res: Response) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    User.findOne({ email: req.body.email }).then((user: any) => {
        if (user) {
            errors.email = "Email already exisets"
            return res.status(400).json(errors.email)
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
})

export default router
