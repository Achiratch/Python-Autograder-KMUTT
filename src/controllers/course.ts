import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import asyncHandler from '../middleware/async'

// Load Course interface
import ICourse from '../interfaces/Course'

// Load Course models
import Course from '../models/Course'


// @desc    Create course
// @route   POST /api/course
// @acess   Private
export const createCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseID, courseName, courseDescription, semester, academicYear, dateCreate }: ICourse = req.body
    const created_course = await Course.create({
        courseID,
        courseName,
        courseDescription,
        semester,
        academicYear,
        dateCreate
    })

    res.status(201).json({
        success: true,
        data: created_course
    });
})

