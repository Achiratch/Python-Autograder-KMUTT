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
import Assignment from '../models/Assignment'
import Question from '../models/Question'
import { model } from 'mongoose'


import isEmpty from '../validation/is-empty'
import { decodeBase64 } from 'bcryptjs'

// @desc    Create Question
// @route   POST /api/question/create
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

// @desc    Get Question by id
// @route   GET /api/question/:id
// @acess   Private
export const GetQuestionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.id

    const question = await Question.findById(questionId)

    res.status(401).json({
        success: true,
        detail: question
    })

})

// @desc    Get all Question 
// @route   GET /api/question/
// @acess   Private
export const GetAllQuestion = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)
    const level: string = req.query.level as any
    const search: string = req.query.search as string

    const queryArray = []
    if (!isEmpty(search)) queryArray.push({ name: { $regex: search, $options: 'i' } })
    if (!isEmpty(level)) queryArray.push({ level: level })

    let question
    if (queryArray.length > 0) {
        question = await Question.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()

    } else {
        question = await Question.find()
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()
    }

    res.status(401).json({
        success: true,
        detail: question
    })

})

// @desc    DELETE Question by id
// @route   DELETE /api/question/:id
// @acess   Private
export const DeleteQuestionById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params.id

    const question = await Question.findById(questionId)
    if (!question) {
        return next(new ErrorResponse('No question with that id', 404))
    }

    const assignment = await Assignment.find({ "questions._id": questionId })
    console.log(assignment)
    if (assignment.length > 0) {
        return next(new ErrorResponse('This question is in assignment, please delete assignment first!', 400))
    }

    fs.unlink(question?.solution.filepath as string, (err) => {
        if (err) throw err
    })
    fs.unlink(question?.sct.filepath as string, (err) => {
        if (err) throw err
    })

    if (!isEmpty(question?.sample.filepath)) {
        fs.unlink(question?.sample.filepath as string, (err) => {
            if (err) throw err
        })
    }

    if (!isEmpty(question.preExercise.filepath)) {
        fs.unlink(question?.preExercise.filepath as string, (err) => {
            if (err) throw err
        })
    }

    const deleteQuestion = await question.remove()


    res.status(401).json({
        success: true,
        message: "Question is removed from db!"
    })

})

// @desc    Update Question
// @route   PUT /api/question/create
// @acess   Private
export const EditQuestion = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const teacherId = user.id
    const teacher = await User.findById(teacherId)
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    if (!files) {
        return next(new ErrorResponse('please upload files', 400))
    }

    let question = await Question.findById(req.params.id)
    if (!question) return next(new ErrorResponse(`We don't have this question id`, 400))

    let solution
    let sct
    let preExercise
    let sample

    let solutionDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }
    if (files['solution']) {
        fs.unlink(question.solution.filepath as string, (err) => {
            if (err) throw err
        })

        solution = files['solution'][0]
        solutionDesc = {
            filename: solution.originalname,
            filepath: solution.path,
            code: fs.readFileSync(solution.path, 'utf8')
        }
    } else {
        solutionDesc = question.sct
    }

    let sctDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }
    if (files['sct']) {
        fs.unlink(question.sct.filepath as string, (err) => {
            if (err) throw err
        })
        sct = files['sct'][0]
        sctDesc = {
            filename: sct.originalname,
            filepath: sct.path,
            code: fs.readFileSync(sct.path, 'utf8')
        }
    } else {
        sctDesc = question.sct
    }




    let preExerciseDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }
    if (files['preExercise']) {
        fs.unlink(question.preExercise.filepath as string, (err) => {
            if (err) throw err
        })
        preExercise = files['preExercise'][0]
        preExerciseDesc = {
            filename: preExercise.originalname,
            filepath: preExercise.path,
            code: fs.readFileSync(preExercise.path, 'utf8')
        }
    } else {
        preExerciseDesc = question.preExercise
    }

    let sampleDesc: fileDesc = {
        filename: "",
        filepath: "",
        code: ""
    }

    if (files['sample'] !== undefined) {
        fs.unlink(question.sample.filepath as string, (err) => {
            if (err) throw err
        })
        sample = files['sample'][0]
        sampleDesc = {
            filename: sample.originalname,
            filepath: sample.path,
            code: fs.readFileSync(sample.path, 'utf8')
        }
    } else {
        sampleDesc = question.sample
    }

    let { name, level, description }: IQuestion = req.body

    if (isEmpty(name)) name = question.name
    if (isEmpty(level)) level = question.level
    if (isEmpty(description)) description = question.description

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

    const updated = await question.updateOne(questionSchema)
    let updatedQuestion = await Question.findById(req.params.id)
    console.log(updated)
    res.status(401).json({
        success: true,
        detail: updatedQuestion
    })

})

