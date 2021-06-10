import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
// Load Course interface
import ICourseTaking from '../interfaces/CourseTaking'
import ICourse from '../interfaces/Course'

// Load Course models
import CourseTaking from '../models/CourseTaking'
import User, { IUser } from '../models/User'
import Course from '../models/Course'
import { model } from 'mongoose'

import isEmpty from '../validation/is-empty'


// @desc    Register course
// @route   POST /api/course/register
// @acess   Private
export const RegisterCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const student = user.id
    const studentDetail = await User.findById(student)

    const { course, status }: ICourseTaking = req.body
    try {
        let c = await Course.findOne({ _id: course })

    } catch {
        return next(new ErrorResponse('We do not have this course!', 404))
    }

    let f = await CourseTaking.findOne({ "$and": [{ 'student._id': studentDetail?._id }, { course: course }] })

    if (f) {
        return next(new ErrorResponse('You already have taken this course', 401))
    }

    const StudentSchema = {
        _id: studentDetail?._id,
        studentID: studentDetail?.studentID,
        email: studentDetail?.email,
        firstName: studentDetail?.firstName,
        lastName: studentDetail?.lastName
    }
    const register_course = await CourseTaking.create({
        course,
        student: StudentSchema,
        status,
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

    const search = req.query.search as string
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)


    const queryArray = []
    queryArray.push({ course: courseId })
    if (!isEmpty(search)) queryArray.push({ "$or": [{ "student.firstName": { $regex: search, $options: 'i' } }, { "student.email": { $regex: search } }] })
    console.log(queryArray)
    console.log(search)

    try {
        let c = await Course.findOne({ _id: courseId })

    } catch {
        return next(new ErrorResponse('We do not have this course!', 404))
    }
    const allStudentInCourse = await CourseTaking.find({ course: courseId })
    const allStudentInCourseCount: Number = allStudentInCourse.length
    let dataSearchCount
    let courseTakingDetail
    if (queryArray.length === 1) {
        courseTakingDetail = await CourseTaking.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit)
        dataSearchCount = await CourseTaking.find({ "$and": queryArray })

    } else {
        courseTakingDetail = await CourseTaking.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec()
        dataSearchCount = await CourseTaking.find({ "$and": queryArray })


        res.status(200).json({
            success: true,
            data: courseTakingDetail,
            allStudents: allStudentInCourseCount,
            dataSearchCount: dataSearchCount

        });
    }



    if (courseTakingDetail.length === 0) {
        return next(new ErrorResponse('No student in this course', 404))
    }

    res.status(200).json({
        success: true,
        data: courseTakingDetail,
        allStudents: allStudentInCourseCount,
        dataSearchCount: dataSearchCount
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
    const search = req.query.search as string
    const semester = req.query.semester as any
    const year = req.query.year as any

    const queryArray = []
    if (!isEmpty(search)) queryArray.push({ '$or': [{ courseID: { $regex: search, $options: 'i' } }, { courseName: { $regex: search, $options: 'i' } }] })
    if (!isEmpty(semester)) queryArray.push({ semester: semester })
    if (!isEmpty(year)) queryArray.push({ academicYear: year })
    let student = await User.findOne({ _id: studentId })

    if (student === null) {
        return next(new ErrorResponse('We dont have this student!', 400))
    }
    const courseArray = []

    try {
        let registerdCourses = await CourseTaking.find({ 'student._id': studentId })


        if (registerdCourses.length === 0) {
            return next(new ErrorResponse(`You didn't register any courses!`, 404))
        }

        for (const r of registerdCourses) {
            const loopQueryArray: any = queryArray
            loopQueryArray.push({ _id: String(r.course) })
            const course = await Course.find({ '$and': loopQueryArray })
            if (course.length > 0) {
                courseArray.push(course[0])
            }
            loopQueryArray.pop()
        }

        if (courseArray.length === 0) {
            return next(new ErrorResponse(`You didn't register any courses!`, 404))
        }
        res.status(200).json({
            success: true,
            courses: courseArray

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

// @desc    Get All UnRegisterd student by courseId
// @route   GET /api/course/:id/invite
// @acess   Private
export const GetAllStudentNotInCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const course_id: any = req.params.id

    const search = req.query.search as string
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)

    // find registered students
    let courseTakingDetail: any = await CourseTaking.find({ course: course_id }).select('student.studentID -_id')
    courseTakingDetail = courseTakingDetail.map((s: any) => s.student.studentID)

    if (courseTakingDetail.length === 0) {
        courseTakingDetail = [1]
    }

    const queryArray = []
    queryArray.push({ studentID: { $nin: courseTakingDetail } })
    if (!isEmpty(search)) queryArray.push({ "$or": [{ "firstName": { $regex: search, $options: 'i' } }, { "email": { $regex: search } }] })

    let unregisteredStudent = await User.find({ "$and": queryArray })
        .select('_id studentID email firstName lastName')
        .skip(page > 0 ? ((page - 1) * limit) : 0)
        .limit(limit)

    let unregisteredStudentCount = (await User.find({ studentID: { $nin: courseTakingDetail } })).length
    let unregisteredStudentSearchCount = await (await User.find({ "$and": queryArray })).length
    res.status(200).json({
        success: true,
        data: unregisteredStudent,
        allStudents: unregisteredStudentCount,
        allSearchStudents: unregisteredStudentSearchCount
    });

})

// @desc    Add students to course
// @route   POST /api/course/invite
// @acess   Private
export const AddStudentsToCourse = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { course, status }: ICourseTaking = req.body
    try {
        let c = await Course.findOne({ _id: course })

    } catch {
        return next(new ErrorResponse('We do not have this course!', 404))
    }

    const students: string[] = JSON.parse(req.body.students)
    for (const student_id of students) {

        const studentDetail = await User.findById(student_id)

        let f = await CourseTaking.findOne({ "$and": [{ 'student._id': studentDetail?._id }, { course: course }] })

        if (f) {
            return next(new ErrorResponse('You already have taken this course', 401))
        }

        let StudentSchema = {
            _id: studentDetail?._id,
            studentID: studentDetail?.studentID,
            email: studentDetail?.email,
            firstName: studentDetail?.firstName,
            lastName: studentDetail?.lastName
        }
        let register_course = await CourseTaking.create({
            course,
            student: StudentSchema,
            status,
        })

    }

    res.status(201).json({
        success: true,
        detail: "Successful"
    })
})
