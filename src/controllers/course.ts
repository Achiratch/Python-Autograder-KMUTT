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

// @desc    Get all course
// @route   GET /api/course
// @acess   Private
export const GetAllCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    let courses = await Course.find()
    if (courses == null) {
        return next(new ErrorResponse('No course found', 404))
    }

    res.status(201).json({
        success: true,
        data: courses
    });
})

// @desc    Get course by id
// @route   GET /api/course/:id
// @acess   Private
export const GetCourseById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let courses = await Course.findById(req.params.id)
        res.status(201).json({
            success: true,
            data: courses
        });

    } catch {
        return next(new ErrorResponse('No course with that id', 404))
    }



})

// @desc    Get course by id
// @route   GET /api/course/:id
// @acess   Private
export const DeleteCourseById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { courseID, courseName, courseDescription, semester, academicYear, dateCreate }: ICourse = req.body
    const user = (req.user as IUser)
    const createdBy = user.id

    let courses = await Course.findById(req.params.id)
    if (!courses) {
        return next(new ErrorResponse('No course with that id', 404))
    }
    if (courses?.createdBy != user.id) {
        return next(new ErrorResponse(`Only course owner can delete course`, 403))
    }
    let update = await courses.updateOne({
        courseID,
        courseName,
        courseDescription,
        semester,
        academicYear,
        dateCreate,
        createdBy
    })

    let updatedCourse = await Course.findById(req.params.id)
    res.status(200).json({
        success: true,
        message: updatedCourse
    })

})

// @desc    Get course by id
// @route   GET /api/course/:id
// @acess   Private
export const UpdateCourseById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser

    let courses = await Course.findById(req.params.id)
    if (!courses) {
        return next(new ErrorResponse('No course with that id', 404))
    }
    if (courses?.createdBy != user.id) {
        return next(new ErrorResponse(`Only course owner can update course detail`, 403))
    }
    let remove = await courses?.remove()
    res.status(200).json({
        success: true,
        message: "This course already has removed from db"
    })

})
