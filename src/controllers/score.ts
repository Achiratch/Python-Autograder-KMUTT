import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../middleware/async'
import ErrorResponse from '../utils/errorResponse'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
// Load Course interface
import ICourseTaking from '../interfaces/CourseTaking'
import ICourse from '../interfaces/Course'
import IQuestion, { fileDesc } from '../interfaces/Question'
import IScore from '../interfaces/Score'
import IScoreBook from '../interfaces/ScoreBook'
// Load Course models
import CourseTaking from '../models/CourseTaking'
import User, { IUser } from '../models/User'
import Assignment from '../models/Assignment'
import Question from '../models/Question'
import { model } from 'mongoose'
import Score from '../models/Score'
import ScoreBook from '../models/ScoreBook'


import isEmpty from '../validation/is-empty'
import { decodeBase64 } from 'bcryptjs'
import { parse } from 'dotenv/types'


// @desc    Create Score by upload
// @route   POST /api/score/create/upload
// @access   Private
export const CreateScoreByUpload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.id
    const student = await User.findById(studentId)
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
    const file = req.file
    const { course, assignment, question, score }: IScore = req.body


    if (!file) {
        return next(new ErrorResponse('please upload files', 400))
    }

    const existedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })
    if (existedScore) return next(new ErrorResponse(`Please use PUT API`, 400))

    const destination: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`,
        `${file.filename}`);

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    const newFilePath = fs.rename(file.path, destinationFileName, function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    })
    let answer: fileDesc = {
        filename: file.originalname,
        filepath: destinationFileName,
        code: fs.readFileSync(file.path, 'utf8')
    }


    const assignmnetDueDate = await Assignment.findById(assignment).select('dueDate')
    if (!assignmnetDueDate) return next(new ErrorResponse(`Don't have this assignment`, 400))

    const questionById = await Question.findById(question)
    if (!questionById) return next(new ErrorResponse(`Don't have this question`, 400))

    const dueDate = Date.parse(assignmnetDueDate?.dueDate.toDateString())
    assignmnetDueDate?.dueDate.toDateString()

    let sendingStatus
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent"
    } else {
        sendingStatus = "Late"
    }



    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    }
    const scoredetail = await Score.create(scoreSchema)

    const assignmentQuestions = await Assignment.findById(assignment).select('questions')
    if (!assignmentQuestions) return next(new ErrorResponse(`Don't have this assignment`, 400))
    const assignmentQuestionCount = assignmentQuestions.questions.length


    const assignmentScoreDetail = await Score.find({ "$and": [{ student: studentId }, { assignment: assignment }] })
    const assignmentScoreDetailCount = assignmentScoreDetail.length


    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus)
    const scores = assignmentQuestions.questions.map(a => a.score)
    const totalScore = scores.reduce((a, b) => a + b)
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score))
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100

    let scoreBookSendingStatus
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`
        } else {
            scoreBookSendingStatus = `Incomplete`
        }
    } else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`
        } else {
            scoreBookSendingStatus = `Complete`
        }
    }

    const existedScoreBook = await ScoreBook.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] })
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    }
    if (!existedScoreBook) {
        const scoreBook = await ScoreBook.create(scoreBookSchema)
    }
    if (existedScoreBook) {
        const updatedScoreBook = await existedScoreBook.updateOne(scoreBookSchema)
    }


    res.status(201).json({
        success: true,
        detail: scoredetail
    })

})

// @desc    Create Score via datacamp
// @route   POST /api/score/create
// @access   Private
export const CreateScoreByString = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.id
    const student = await User.findById(studentId)
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
    const { course, assignment, question, score }: IScore = req.body
    const code = req.body.answer

    const existedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })
    if (existedScore) return next(new ErrorResponse(`Please use PUT API`, 400))

    const filename = new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + `${user.studentID}.py`


    const destination: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`,
        `${filename}`);

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    fs.appendFile(destinationFileName, code, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    let answer: fileDesc = {
        filename: filename,
        filepath: destinationFileName,
        code: code
    }


    const assignmnetDueDate = await Assignment.findById(assignment).select('dueDate')
    if (!assignmnetDueDate) return next(new ErrorResponse(`Don't have this assignment`, 400))

    const questionById = await Question.findById(question)
    if (!questionById) return next(new ErrorResponse(`Don't have this question`, 400))

    const dueDate = Date.parse(assignmnetDueDate?.dueDate.toDateString())
    assignmnetDueDate?.dueDate.toDateString()

    let sendingStatus
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent"
    } else {
        sendingStatus = "Late"
    }


    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    }
    const scoreBook = await Score.create(scoreSchema)

    const assignmentQuestions = await Assignment.findById(assignment).select('questions')
    if (!assignmentQuestions) return next(new ErrorResponse(`Don't have this assignment`, 400))
    const assignmentQuestionCount = assignmentQuestions.questions.length


    const assignmentScoreDetail = await Score.find({ "$and": [{ student: studentId }, { assignment: assignment }] })
    const assignmentScoreDetailCount = assignmentScoreDetail.length


    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus)
    const scores = assignmentQuestions.questions.map(a => a.score)
    const totalScore = scores.reduce((a, b) => a + b)
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score))
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100

    let scoreBookSendingStatus
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`
        } else {
            scoreBookSendingStatus = `Incomplete`
        }
    } else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`
        } else {
            scoreBookSendingStatus = `Complete`
        }
    }

    const existedScoreBook = await ScoreBook.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] })
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    }
    if (!existedScoreBook) {
        const scoreBook = await ScoreBook.create(scoreBookSchema)
    }
    if (existedScoreBook) {
        const updatedScoreBook = await existedScoreBook.updateOne(scoreBookSchema)
    }

    res.status(201).json({
        success: true,
        detail: scoreBook
    })

})

// @desc    Get all answer by assignment and studentId
// @route   GET /api/score/assignment/:id
// @access   Private
export const GetAllAnswerByStudentId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.id
    const assignmentId: any = req.params.id

    const allAnswer = await Score.find({ "$and": [{ student: studentId }, { assignment: assignmentId }] }).select('-answer')
    if (allAnswer.length === 0) return next(new ErrorResponse(`Bad input`, 400))
    res.status(201).json({
        success: true,
        detail: allAnswer
    })
})

// @desc    Get answer by score id
// @route   GET /api/score/:id
// @access   Private
export const GetAnswerByScoreId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const scoreId: any = req.params.id

    const answer = await Score.findById(scoreId)
    if (!answer) return next(new ErrorResponse(`Bad input`, 400))
    res.status(201).json({
        success: true,
        detail: answer
    })
})

// @desc Get Sending status by course id and student id
// @route GET /api/score/student/course/:id/status
// @access Private
export const GetSendingStatusByStudentId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.studentID
    const courseId: any = req.params.id

    const scoreBooks = await ScoreBook.find({ "$and": [{ 'student.studentID': studentId }, { course: courseId }] })
    if (scoreBooks.length === 0) return next(new ErrorResponse(`Bad input`, 400))

    res.status(201).json({
        success: true,
        detail: scoreBooks
    })
})

// @desc Get Sending status by course id
// @route GET /api/score/course/:id/status
// @access Private
export const GetSendingStatusByCourseId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const courseId: any = req.params.id
    const page: number = req.query.page as any
    const limit: number = parseInt(req.query.limit as string)
    const search: string = req.query.search as string
    const queryArray = []

    let scoreBooks
    // if (scoreBooks.length === 0) return next(new ErrorResponse(`Bad input`, 400))
    queryArray.push({ course: courseId })
    if (!isEmpty(search)) {
        queryArray.push({ "$or": [{ "student.firstName": { $regex: search, $options: 'i' } }, { "student.email": { $regex: search } }] })
    }
    let scoreBooksSearchCount

    scoreBooks = await ScoreBook.find({ "$and": queryArray })
        .skip(page > 0 ? ((page - 1) * limit) : 0)
        .limit(limit).exec()
    scoreBooksSearchCount = (await ScoreBook.find({ "$and": queryArray })).length


    const scoreBooksCount = (await ScoreBook.estimatedDocumentCount()).toFixed()
    res.status(201).json({
        success: true,
        detail: scoreBooks,
        count: scoreBooksCount,
        searchCount: scoreBooksSearchCount
    })
})

// @desc    Edit Score by upload
// @route   PUT /api/score/edit/upload
// @access   Private
export const EditScoreByUpload = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.id
    const student = await User.findById(studentId)
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
    const file = req.file
    const { course, assignment, question, score }: IScore = req.body


    if (!file) {
        return next(new ErrorResponse('please upload files', 400))
    }

    const existedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })
    if (!existedScore) return next(new ErrorResponse(`Please use POST API`, 400))

    fs.unlink(existedScore.answer.filepath as string, (err) => {
        if (err) throw err
    })

    const destination: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`,
        `${file.filename}`);

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    const newFilePath = fs.rename(file.path, destinationFileName, function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    })
    let answer: fileDesc = {
        filename: file.originalname,
        filepath: destinationFileName,
        code: fs.readFileSync(file.path, 'utf8')
    }


    const assignmnetDueDate = await Assignment.findById(assignment).select('dueDate')
    if (!assignmnetDueDate) return next(new ErrorResponse(`Don't have this assignment`, 400))

    const questionById = await Question.findById(question)
    if (!questionById) return next(new ErrorResponse(`Don't have this question`, 400))

    const dueDate = Date.parse(assignmnetDueDate?.dueDate.toDateString())
    assignmnetDueDate?.dueDate.toDateString()

    let sendingStatus
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent"
    } else {
        sendingStatus = "Late"
    }

    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    }
    const scoredetail = await existedScore.updateOne(scoreSchema)

    const assignmentQuestions = await Assignment.findById(assignment).select('questions')
    if (!assignmentQuestions) return next(new ErrorResponse(`Don't have this assignment`, 400))
    const assignmentQuestionCount = assignmentQuestions.questions.length


    const assignmentScoreDetail = await Score.find({ assignment: assignment })
    const assignmentScoreDetailCount = assignmentScoreDetail.length


    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus)
    const scores = assignmentQuestions.questions.map(a => a.score)
    const totalScore = scores.reduce((a, b) => a + b)
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score))
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100

    let scoreBookSendingStatus
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`
        } else {
            scoreBookSendingStatus = `Incomplete`
        }
    } else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`
        } else {
            scoreBookSendingStatus = `Complete`
        }
    }

    const existedScoreBook = await ScoreBook.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] })
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    }
    if (!existedScoreBook) {
        const scoreBook = await ScoreBook.create(scoreBookSchema)
    }
    if (existedScoreBook) {
        const updatedScoreBook = await existedScoreBook.updateOne(scoreBookSchema)
    }
    const updatedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })


    res.status(201).json({
        success: true,
        detail: updatedScore
    })

})

// @desc    Edit Score via datacamp
// @route   PUT /api/score/edit
// @access   Private
export const EditScoreByString = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as IUser
    const studentId = user.id
    const student = await User.findById(studentId)
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
    const { course, assignment, question, score }: IScore = req.body
    const code = req.body.answer

    const existedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })
    if (!existedScore) return next(new ErrorResponse(`Please use POST API`, 400))

    fs.unlink(existedScore.answer.filepath as string, (err) => {
        if (err) throw err
    })

    const filename = new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + `${user.studentID}.py`


    const destination: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName: string = path.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`,
        `${filename}`);

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    fs.appendFile(destinationFileName, code, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    let answer: fileDesc = {
        filename: filename,
        filepath: destinationFileName,
        code: code
    }


    const assignmnetDueDate = await Assignment.findById(assignment).select('dueDate')
    if (!assignmnetDueDate) return next(new ErrorResponse(`Don't have this assignment`, 400))

    const questionById = await Question.findById(question)
    if (!questionById) return next(new ErrorResponse(`Don't have this question`, 400))

    const dueDate = Date.parse(assignmnetDueDate?.dueDate.toDateString())
    assignmnetDueDate?.dueDate.toDateString()

    let sendingStatus
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent"
    } else {
        sendingStatus = "Late"
    }


    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    }
    const scoreBook = await existedScore.updateOne(scoreSchema)

    const assignmentQuestions = await Assignment.findById(assignment).select('questions')
    if (!assignmentQuestions) return next(new ErrorResponse(`Don't have this assignment`, 400))
    const assignmentQuestionCount = assignmentQuestions.questions.length


    const assignmentScoreDetail = await Score.find({ assignment: assignment })
    const assignmentScoreDetailCount = assignmentScoreDetail.length


    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus)
    const scores = assignmentQuestions.questions.map(a => a.score)
    const totalScore = scores.reduce((a, b) => a + b)
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score))
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100

    let scoreBookSendingStatus
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`
        } else {
            scoreBookSendingStatus = `Incomplete`
        }
    } else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Complete`
        } else {
            scoreBookSendingStatus = `Complete`
        }
    }

    const existedScoreBook = await ScoreBook.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] })
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    }
    if (!existedScoreBook) {
        const scoreBook = await ScoreBook.create(scoreBookSchema)
    }
    if (existedScoreBook) {
        const updatedScoreBook = await existedScoreBook.updateOne(scoreBookSchema)
    }

    const updatedScore = await Score.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] })

    res.status(201).json({
        success: true,
        detail: updatedScore
    })

})

// @desc    Edit score by score id
// @route   PUT /api/score/:id/editscore
// @access   Private
export const EditScoreByScoreId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newScore = req.body.score
    const scoreId: any = req.params.id

    const answer = await Score.findById(scoreId)
    if (!answer) return next(new ErrorResponse(`Bad input`, 400))

    const scoreSchema = {
        course: answer.course,
        student: answer.student,
        assignment: answer.assignment,
        question: answer.question,
        sendingStatus: answer.sendingStatus,
        answer: answer.answer,
        score: newScore
    }
    const newScoreDetail = await answer.updateOne(scoreSchema)

    const assignmentQuestions = await Assignment.findById(answer.assignment).select('questions')
    if (!assignmentQuestions) return next(new ErrorResponse(`Don't have this assignment`, 400))
    const assignmentQuestionCount = assignmentQuestions.questions.length


    const assignmentScoreDetail = await Score.find({ assignment: answer.assignment })
    const assignmentScoreDetailCount = assignmentScoreDetail.length


    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus)
    const scores = assignmentQuestions.questions.map(a => a.score)
    const totalScore = scores.reduce((a, b) => a + b)
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score))
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100

    let scoreBookSendingStatus
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`
        } else {
            scoreBookSendingStatus = `Incomplete`
        }
    } else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Complete`
        } else {
            scoreBookSendingStatus = `Complete`
        }
    }
    const student = await User.findById(answer.student).select('-password')
    if (!student) return next(new ErrorResponse(`DB keep wrong data`, 500))
    const studentProfile = {
        studentID: student.studentID,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
    }
    const existedScoreBook = await ScoreBook.findOne({ "$and": [{ "student.studentID": student.studentID }, { assignment: answer.assignment }] })
    const scoreBookSchema = {
        course: answer.course,
        student: studentProfile,
        assignment: answer.assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    }
    if (!existedScoreBook) {
        const scoreBook = await ScoreBook.create(scoreBookSchema)
    }
    if (existedScoreBook) {
        const updatedScoreBook = await existedScoreBook.updateOne(scoreBookSchema)
    }
    const updatedScore = await Score.findOne({ "$and": [{ assignment: answer.assignment }, { question: answer.question }, { student: answer.student }] })

    res.status(201).json({
        success: true,
        detail: updatedScore
    })
})