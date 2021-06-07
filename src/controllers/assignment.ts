import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
// Load Course interface
import ICourse from '../interfaces/Course'
import IAssignment, { IQuestionDetail } from '../interfaces/Assignment'
// Load Course models
import Course from '../models/Course'
import { default as User, IUser } from '../models/User'
import isEmpty from '../validation/is-empty'
import isDulpicateInArray from '../validation/is-dulplicateInArray'

import Assignment from '../models/Assignment'
import Question from '../models/Question'
import IProfile from '../interfaces/Profile'
import IsDulpicateInArray from '../validation/is-dulplicateInArray'
import { ObjectId } from 'mongoose'

// @desc    Create assignment
// @route   POST /api/assignment/create
// @acess   Private
export const CreateAssignment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, course, dueDate, totalScore, level, type }: IAssignment = req.body
    try {
        let courses = await Course.findById(course)
    } catch {
        return next(new ErrorResponse('No course with that id', 400))
    }
    const user = await User.findById((req.user as IUser).id).select('studentID firstName lastName email -_id') as IUser
    const createdBy = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    const questions: IQuestionDetail[] = JSON.parse(req.body.questions)
    const questionIdArray = questions.map(q => q._id)
    const IsDulpicateQuestionExist = IsDulpicateInArray(questionIdArray)
    if (IsDulpicateQuestionExist) {
        return next(new ErrorResponse(`Don't insert dulpicate question in same assignment`, 400))
    }
    const checkExistQuestion = async () => {
        let loopError: number = 0
        for (const question of questions) {
            const IsQuestion = await Question.findById(question._id)
            if (!IsQuestion) {
                loopError++
            }
        }
        return loopError
    }

    const notExistQuestion = await checkExistQuestion()
    if (notExistQuestion > 0) return next(new ErrorResponse('Please input valid question id', 400))
    const assignment = await Assignment.create({
        name,
        description,
        course,
        createdBy: user,
        questions,
        dueDate,
        totalScore,
        level,
        type
    })


    res.status(201).json({
        success: true,
        detail: assignment
    });
})

// @desc    Get Assignment by id
// @route   GET /api/assignment/:id
// @acess   Private
export const GetAssignmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const assignmentId = req.params.id

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) return next(new ErrorResponse(`We don't have this assignment`, 404))

    res.status(200).json({
        success: true,
        detail: assignment
    })

})

// @desc    Get all Assignment 
// @route   GET /api/assignment/
// @acess   Private
export const GetAllAssignment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)
    const level: string = req.query.level as any
    const search: string = req.query.search as string

    const queryArray = []
    if (!isEmpty(search)) queryArray.push({ name: { $regex: search, $options: 'i' } })
    if (!isEmpty(level)) queryArray.push({ level: level })

    let assignment
    let assignmentSearchCount
    if (queryArray.length > 0) {
        assignment = await Assignment.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()
        assignmentSearchCount = await (await Assignment.find({ "$and": queryArray })).length

    } else {
        assignment = await Assignment.find()
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()
        assignmentSearchCount = await (await Assignment.find()).length

    }

    const assignmentCount = (await Assignment.estimatedDocumentCount()).toFixed()
    res.status(200).json({
        success: true,
        detail: assignment,
        count: assignmentCount,
        searchCount: assignmentSearchCount
    })

})

// @desc    DELETE Assignment by id
// @route   DELETE /api/assignment/:id
// @acess   Private
export const DeleteAssignmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const assignmentId = req.params.id

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) {
        return next(new ErrorResponse('No assignment with that id', 404))
    }

    const deleteAssignment = await assignment.remove()


    res.status(200).json({
        success: true,
        message: "Assignment is removed from db!"
    })

})

// @desc    Update assignment by id
// @route   PUT /api/assignment/:id/update
// @acess   Private
export const UpdateAssignmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, course, dueDate, totalScore, level, type }: IAssignment = req.body

    const assignmentId = req.params.id

    const assignment = await Assignment.findById(assignmentId)

    if (!assignment) {
        return next(new ErrorResponse('No assignment with that id', 404))
    }

    if (isEmpty(name)) name = assignment.name
    if (isEmpty(description)) description = assignment.description
    if (isEmpty(course)) course = assignment.course
    if (isEmpty(dueDate)) dueDate = assignment.dueDate
    if (isEmpty(totalScore)) totalScore = assignment.totalScore
    if (isEmpty(level)) level = assignment.level
    if (isEmpty(type)) type = assignment.type

    try {
        let courses = await Course.findById(course)
    } catch {
        return next(new ErrorResponse('No course with that id', 400))
    }
    const user = await User.findById((req.user as IUser).id).select('studentID firstName lastName email -_id') as IUser
    const editedBy = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }

    let questions: IQuestionDetail[] = JSON.parse(req.body.questions)
    if (isEmpty(questions)) questions = assignment.questions
    const questionIdArray = questions.map(q => q._id)
    const IsDulpicateQuestionExist = IsDulpicateInArray(questionIdArray)
    if (IsDulpicateQuestionExist) {
        return next(new ErrorResponse(`Don't insert dulpicate question in same assignment`, 400))
    }

    questions.forEach(async question => {
        try {
            console.log(question)
            const IsQuestion = await Question.findById(question._id)
            if (!IsQuestion) {
                return next(new ErrorResponse('Please input valid question id!!', 400))
            }

        } catch {
            return next(new ErrorResponse('Please input valid question id!!', 400))
        }
    })
    const update = await assignment.updateOne({
        name,
        description,
        course,
        createdBy: assignment.createdBy,
        questions,
        dueDate,
        totalScore,
        level,
        type
    })
    const updatedAssignment = await Assignment.findById(assignmentId)


    res.status(201).json({
        success: true,
        detail: updatedAssignment
    });
})

// @desc    Get Assignment by course id
// @route   GET /api/assignment/course/:id
// @acess   Private
export const GetAssignmentByCourseId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseId: any = req.params.id
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)
    const level: string = req.query.level as any
    const search: string = req.query.search as string

    const existCourse = await Course.findById(courseId)
    if (!existCourse) return next(new ErrorResponse(`We don't have this course`, 404))

    const queryArray = []
    if (!isEmpty(search)) queryArray.push({ name: { $regex: search, $options: 'i' } })
    if (!isEmpty(level)) queryArray.push({ level: level })
    queryArray.push({ course: courseId })

    let assignment
    let assignmentSearchCount
    if (queryArray.length > 0) {
        assignment = await Assignment.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()
        assignmentSearchCount = (await Assignment.find({ "$and": queryArray })).length

    }

    const assignmentCount = (await Assignment.estimatedDocumentCount()).toFixed()
    res.status(200).json({
        success: true,
        detail: assignment,
        count: assignmentCount,
        searchCount: assignmentSearchCount
    })
})

// @desc    Get Assignment by id
// @route   GET /api/assignment/:id/questions
// @acess   Private
export const GetQuestionsByAssignmentId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const assignmentId = req.params.id

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) return next(new ErrorResponse(`We don't have this assignment`, 404))

    const questions = assignment.questions
    const questionsId = questions.map(q => q._id)
    let questionsDetail = []
    for (const q of questions) {
        let question = await Question.findById(q._id)

        if (question) {
            let leanQuestion: any = question.toObject()
            leanQuestion.score = q.score
            questionsDetail.push(leanQuestion)
        }
    }
    const questionsCount = questionsDetail.length
    res.status(200).json({
        success: true,
        detail: questionsDetail,
        count: questionsCount
    })

})

// @desc    Get question in assignment
// @route   GET /api/assignment/:id/question
// @acess   Private
export const GetQuestionByAssignmentIdAndQuestionId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const assignmentId = req.params.id
    const questionId = req.params.questionId
    let thisQuestion = await Question.findById(questionId)
    if (!thisQuestion) return next(new ErrorResponse(`We don't have this question`, 404))
    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) return next(new ErrorResponse(`We don't have this assignment`, 404))

    const questions = assignment.questions
    const questionsId = questions.map(q => q._id)
    let questionsDetail = []
    for (const q of questions) {
        if (String(q._id) === String(thisQuestion._id)) {
            let question = await Question.findById(q._id)

            if (question) {
                let leanQuestion: any = question.toObject()
                leanQuestion.score = q.score
                questionsDetail.push(leanQuestion)
            }
        }
    }
    res.status(200).json({
        success: true,
        detail: questionsDetail,
    })

})