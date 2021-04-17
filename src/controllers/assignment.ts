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

