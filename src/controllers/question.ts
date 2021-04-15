import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
import multer from 'multer'
import fs from 'fs'
// Load Course interface
import ICourseTaking from '../interfaces/CourseTaking'
import ICourse from '../interfaces/Course'
import IQuestion, { fileDesc } from '../interfaces/Question'
// Load Course models
import CourseTaking from '../models/CourseTaking'
import User, { IUser } from '../models/User'
import Course from '../models/Course'
import Question from '../models/Question'
import { model } from 'mongoose'


import isEmpty from '../validation/is-empty'

// @desc    Create Question
// @route   POST /api/question
// @acess   Private
export const CreateQuestion = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const teacherId = user.id
    const teacher = await User.findById(teacherId)
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    if (!files) {
        return next(new ErrorResponse('please upload files', 400))
    }
    let solution
    let sct
    let preExercise
    let sample

    solution = files['solution'][0]
    let solutionDesc: fileDesc = {
        filename: solution.originalname,
        filepath: solution.path,
        code: fs.readFileSync(solution.path, 'utf8')
    }


    sct = files['sct'][0]
    let sctDesc: fileDesc = {
        filename: sct.originalname,
        filepath: sct.path,
        code: fs.readFileSync(sct.path, 'utf8')
    }

    let preExerciseDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }
    if (files['preExercise']) {
        preExercise = files['preExercise'][0]
        preExerciseDesc = {
            filename: preExercise.originalname,
            filepath: preExercise.path,
            code: fs.readFileSync(preExercise.path, 'utf8')
        }
    }

    let sampleDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }

    if (files['sample'] !== undefined) {
        sample = files['sample'][0]
        sampleDesc = {
            filename: sample.originalname,
            filepath: sample.path,
            code: fs.readFileSync(sample.path, 'utf8')
        }
    }
    const { name, level, description }: IQuestion = req.body
    const TeacherSchema = {
        _id: teacher?._id,
        studentID: teacher?.studentID,
        email: teacher?.email,
        firstName: teacher?.firstName,
        lastName: teacher?.lastName
    }
    const questionSchema = {
        name,
        description,
        teacher: TeacherSchema,
        level,
        sct: sctDesc,
        solution: solutionDesc,
        sample: sampleDesc,
        preExercise: preExerciseDesc
    }
    const question = await Question.create(questionSchema)

    res.status(401).json({
        success: true,
        detail: question
    })

})