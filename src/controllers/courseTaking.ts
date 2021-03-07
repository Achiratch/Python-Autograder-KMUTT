import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
// Load Course interface
import ICourseTaking from '../interfaces/CourseTaking'

// Load Course models
import CourseTaking from '../models/CourseTaking'
import User, { IUser } from '../models/User'
import Course from '../models/Course'
import { model } from 'mongoose'
import ICourse from '../interfaces/Course'

// @desc    Register course
// @route   POST /api/course/register
// @acess   Private
export const RegisterCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const student = user.id

    const { course, status, dateCreate }: ICourseTaking = req.body
    try {
        let c = await Course.findOne({ _id: course })

    } catch {
        return next(new ErrorResponse('We do not have this course!', 404))
    }

    let f = await CourseTaking.findOne({ "$and": [{ student: student }, { course: course }] })

    if (f) {
        return next(new ErrorResponse('You already have taken this course', 401))
    }

    const register_course = await CourseTaking.create({
        course,
        student,
        status,
        dateCreate,
    })

    res.status(401).json({
        success: true,
        detail: register_course
    })

})

// @desc    Get All Register Info by courseId
// @route   GET /api/course/:id/students
// @acess   Private
export const GetAllStudentInCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseId: any = req.params.id

    try {
        let c = await Course.findOne({ _id: courseId })

    } catch {
        return next(new ErrorResponse('We do not have this course!', 404))
    }

    let courseTakingDetail = await CourseTaking.find({ course: courseId })
        .select('student')
        .populate('student', ['studentID', 'firstName', 'lastName', 'email'])

    if (courseTakingDetail.length === 0) {
        return next(new ErrorResponse('No student in this course', 404))
    }

    res.status(200).json({
        success: true,
        data: courseTakingDetail,
        allStudents: courseTakingDetail.length

    });

})
// @desc    Resign Course
// @route   DELETE /api/course/resign/:id
// @acess   Private
export const ResignCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseTakingId = req.params.id
    const user = req.user as IUser
    let c = await CourseTaking.findById({ _id: courseTakingId })
    let student = c?.student
    try {
        if (student != user.id) {
            return next(new ErrorResponse('You can remove your registered courses only!', 403))
        }
    } catch {
        return next(new ErrorResponse(`You didn't register this course`, 404))
    }

    console.log("before resign")
    let resign = await CourseTaking.findOneAndRemove({ _id: courseTakingId })

    res.status(200).json({
        success: true,
        message: "You already have resigned this course!"

    });
})

// @desc    Get All RegisterCourse by studentId
// @route   GET /api/course/student/:id
// @acess   Private
export const GetAllRegisterdCourses = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const studentId: any = req.params.id
    let student = await User.findOne({ _id: studentId })
    if (student === null) {
        return next(new ErrorResponse('We dont have this student!', 400))
    }

    try {
        let registerdCourses = await CourseTaking.find({ student: studentId })
            .select('course')
            .populate('course')

        if (registerdCourses.length === 0) {
            return next(new ErrorResponse(`You didn't register any courses!`, 404))
        }

        res.status(200).json({
            success: true,
            courses: registerdCourses

        });
    } catch (error) {
        console.log(error)
        return next(new ErrorResponse(`You didn't register any courses!`, 404))
    }

})

// @desc    Resign Course
// @route   DELETE /api/course/kick/:id
// @acess   Private
export const KickStudentFromCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseTakingId = req.params.id
    const user = req.user as IUser
    const owner: any = user.id

    try {
        let c = await CourseTaking.findOne({ _id: courseTakingId }).populate('course')

        if ((c?.course as ICourse).createdBy != owner) {
            return next(new ErrorResponse('You can kick student in your course only', 403))
        }

    } catch {
        return next(new ErrorResponse(`This student didn't register this course`, 404))
    }


    let resign = await CourseTaking.findOneAndRemove({ _id: courseTakingId })


    res.status(200).json({
        success: true,
        message: "You already have kicked this student from this course!"

    });
})