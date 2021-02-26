import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
// Load Course interface
import ICourse from '../interfaces/Course'

// Load Course models
import Course from '../models/Course'
import { default as User, IUser } from '../models/User'

// @desc    Create course
// @route   POST /api/course
// @acess   Private
export const createCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseID, courseName, courseDescription, semester, academicYear, dateCreate }: ICourse = req.body
    const user = (req.user as IUser)
    const createdBy = user.id

    let c = await Course.findOne({ courseID: courseID, academicYear: academicYear, semester: semester })
    if (c !== null) {
        return next(new ErrorResponse('This courseID is already existed on this semester!', 400))
    }

    const created_course = await Course.create({
        courseID,
        courseName,
        courseDescription,
        semester,
        academicYear,
        dateCreate,
        createdBy
    })



    res.status(201).json({
        success: true,
        data: created_course
    });
})

