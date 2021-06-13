"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAnswerByStudentIdForTeacher = exports.EditScoreByScoreId = exports.EditScoreByString = exports.EditScoreByUpload = exports.GetSendingStatusByCourseId = exports.GetSendingStatusByStudentId = exports.GetAnswerByScoreId = exports.GetAllAnswerByStudentId = exports.CreateScoreByString = exports.CreateScoreByUpload = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
const Assignment_1 = __importDefault(require("../models/Assignment"));
const Question_1 = __importDefault(require("../models/Question"));
const Score_1 = __importDefault(require("../models/Score"));
const ScoreBook_1 = __importDefault(require("../models/ScoreBook"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
// @desc    Create Score by upload
// @route   POST /api/score/create/upload
// @access   Private
exports.CreateScoreByUpload = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.id;
    const student = yield User_1.default.findById(studentId);
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const file = req.file;
    const { course, assignment, question, score } = req.body;
    if (!file) {
        return next(new errorResponse_1.default('please upload files', 400));
    }
    const existedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    if (existedScore)
        return next(new errorResponse_1.default(`Please use PUT API`, 400));
    const destination = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`, `${file.filename}`);
    if (!fs_1.default.existsSync(destination)) {
        fs_1.default.mkdirSync(destination, { recursive: true });
    }
    const newFilePath = fs_1.default.rename(file.path, destinationFileName, function (err) {
        if (err)
            throw err;
        console.log('File Renamed!');
    });
    let answer = {
        filename: file.originalname,
        filepath: destinationFileName,
        code: fs_1.default.readFileSync(file.path, 'utf8')
    };
    const assignmnetDueDate = yield Assignment_1.default.findById(assignment).select('dueDate');
    if (!assignmnetDueDate)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const questionById = yield Question_1.default.findById(question);
    if (!questionById)
        return next(new errorResponse_1.default(`Don't have this question`, 400));
    const dueDate = Date.parse(assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString());
    assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString();
    let sendingStatus;
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent";
    }
    else {
        sendingStatus = "Late";
    }
    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    };
    const scoredetail = yield Score_1.default.create(scoreSchema);
    const assignmentQuestions = yield Assignment_1.default.findById(assignment).select('questions');
    if (!assignmentQuestions)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const assignmentQuestionCount = assignmentQuestions.questions.length;
    const assignmentScoreDetail = yield Score_1.default.find({ "$and": [{ student: studentId }, { assignment: assignment }] });
    const assignmentScoreDetailCount = assignmentScoreDetail.length;
    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus);
    const scores = assignmentQuestions.questions.map(a => a.score);
    const totalScore = scores.reduce((a, b) => a + b);
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score));
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100;
    let scoreBookSendingStatus;
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`;
        }
        else {
            scoreBookSendingStatus = `Incomplete`;
        }
    }
    else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`;
        }
        else {
            scoreBookSendingStatus = `Complete`;
        }
    }
    const existedScoreBook = yield ScoreBook_1.default.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] });
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    };
    if (!existedScoreBook) {
        const scoreBook = yield ScoreBook_1.default.create(scoreBookSchema);
    }
    if (existedScoreBook) {
        const updatedScoreBook = yield existedScoreBook.updateOne(scoreBookSchema);
    }
    res.status(201).json({
        success: true,
        detail: scoredetail
    });
}));
// @desc    Create Score via datacamp
// @route   POST /api/score/create
// @access   Private
exports.CreateScoreByString = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.id;
    const student = yield User_1.default.findById(studentId);
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const { course, assignment, question, score } = req.body;
    const code = req.body.answer;
    const existedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    if (existedScore)
        return next(new errorResponse_1.default(`Please use PUT API`, 400));
    const filename = new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + `${user.studentID}.py`;
    const destination = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`, `${filename}`);
    if (!fs_1.default.existsSync(destination)) {
        fs_1.default.mkdirSync(destination, { recursive: true });
    }
    fs_1.default.appendFile(destinationFileName, code, function (err) {
        if (err)
            throw err;
        console.log('Saved!');
    });
    let answer = {
        filename: filename,
        filepath: destinationFileName,
        code: code
    };
    const assignmnetDueDate = yield Assignment_1.default.findById(assignment).select('dueDate');
    if (!assignmnetDueDate)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const questionById = yield Question_1.default.findById(question);
    if (!questionById)
        return next(new errorResponse_1.default(`Don't have this question`, 400));
    const dueDate = Date.parse(assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString());
    assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString();
    let sendingStatus;
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent";
    }
    else {
        sendingStatus = "Late";
    }
    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    };
    const scoreBook = yield Score_1.default.create(scoreSchema);
    const assignmentQuestions = yield Assignment_1.default.findById(assignment).select('questions');
    if (!assignmentQuestions)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const assignmentQuestionCount = assignmentQuestions.questions.length;
    const assignmentScoreDetail = yield Score_1.default.find({ "$and": [{ student: studentId }, { assignment: assignment }] });
    const assignmentScoreDetailCount = assignmentScoreDetail.length;
    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus);
    const scores = assignmentQuestions.questions.map(a => a.score);
    const totalScore = scores.reduce((a, b) => a + b);
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score));
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100;
    let scoreBookSendingStatus;
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`;
        }
        else {
            scoreBookSendingStatus = `Incomplete`;
        }
    }
    else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`;
        }
        else {
            scoreBookSendingStatus = `Complete`;
        }
    }
    const existedScoreBook = yield ScoreBook_1.default.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] });
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    };
    if (!existedScoreBook) {
        const scoreBook = yield ScoreBook_1.default.create(scoreBookSchema);
    }
    if (existedScoreBook) {
        const updatedScoreBook = yield existedScoreBook.updateOne(scoreBookSchema);
    }
    res.status(201).json({
        success: true,
        detail: scoreBook
    });
}));
// @desc    Get all answer by assignment and studentId
// @route   GET /api/score/assignment/:id
// @access   Private
exports.GetAllAnswerByStudentId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.id;
    const assignmentId = req.params.id;
    const allAnswer = yield Score_1.default.find({ "$and": [{ student: studentId }, { assignment: assignmentId }] }).select('-answer');
    if (allAnswer.length === 0)
        return next(new errorResponse_1.default(`Bad input`, 400));
    res.status(201).json({
        success: true,
        detail: allAnswer
    });
}));
// @desc    Get answer by score id
// @route   GET /api/score/:id
// @access   Private
exports.GetAnswerByScoreId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const scoreId = req.params.id;
    const answer = yield Score_1.default.findById(scoreId);
    if (!answer)
        return next(new errorResponse_1.default(`Bad input`, 400));
    res.status(201).json({
        success: true,
        detail: answer
    });
}));
// @desc Get Sending status by course id and student id
// @route GET /api/score/student/course/:id/status
// @access Private
exports.GetSendingStatusByStudentId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.studentID;
    const courseId = req.params.id;
    const scoreBooks = yield ScoreBook_1.default.find({ "$and": [{ 'student.studentID': studentId }, { course: courseId }] });
    if (scoreBooks.length === 0)
        return next(new errorResponse_1.default(`Bad input`, 400));
    res.status(201).json({
        success: true,
        detail: scoreBooks
    });
}));
// @desc Get Sending status by course id
// @route GET /api/score/course/:id/assignment/:aid/status
// @access Private
exports.GetSendingStatusByCourseId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const assignmentId = req.params.aid;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    const queryArray = [];
    let scoreBooks;
    // if (scoreBooks.length === 0) return next(new ErrorResponse(`Bad input`, 400))
    queryArray.push({ "$and": [{ course: courseId }, { assignment: assignmentId }] });
    if (!is_empty_1.default(search)) {
        queryArray.push({ "$or": [{ "student.firstName": { $regex: search, $options: 'i' } }, { "student.email": { $regex: search } }] });
    }
    let scoreBooksSearchCount;
    scoreBooks = yield ScoreBook_1.default.find({ "$and": queryArray })
        .skip(page > 0 ? ((page - 1) * limit) : 0)
        .limit(limit).exec();
    scoreBooksSearchCount = (yield ScoreBook_1.default.find({ "$and": queryArray })).length;
    const scoreBooksCount = (yield ScoreBook_1.default.estimatedDocumentCount()).toFixed();
    res.status(201).json({
        success: true,
        detail: scoreBooks,
        count: scoreBooksCount,
        searchCount: scoreBooksSearchCount
    });
}));
// @desc    Edit Score by upload
// @route   PUT /api/score/edit/upload
// @access   Private
exports.EditScoreByUpload = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.id;
    const student = yield User_1.default.findById(studentId);
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const file = req.file;
    const { course, assignment, question, score } = req.body;
    if (!file) {
        return next(new errorResponse_1.default('please upload files', 400));
    }
    const existedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    if (!existedScore)
        return next(new errorResponse_1.default(`Please use POST API`, 400));
    fs_1.default.unlink(existedScore.answer.filepath, (err) => {
        if (err)
            throw err;
    });
    const destination = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`, `${file.filename}`);
    if (!fs_1.default.existsSync(destination)) {
        fs_1.default.mkdirSync(destination, { recursive: true });
    }
    const newFilePath = fs_1.default.rename(file.path, destinationFileName, function (err) {
        if (err)
            throw err;
        console.log('File Renamed!');
    });
    let answer = {
        filename: file.originalname,
        filepath: destinationFileName,
        code: fs_1.default.readFileSync(file.path, 'utf8')
    };
    const assignmnetDueDate = yield Assignment_1.default.findById(assignment).select('dueDate');
    if (!assignmnetDueDate)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const questionById = yield Question_1.default.findById(question);
    if (!questionById)
        return next(new errorResponse_1.default(`Don't have this question`, 400));
    const dueDate = Date.parse(assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString());
    assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString();
    let sendingStatus;
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent";
    }
    else {
        sendingStatus = "Late";
    }
    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    };
    const scoredetail = yield existedScore.updateOne(scoreSchema);
    const assignmentQuestions = yield Assignment_1.default.findById(assignment).select('questions');
    if (!assignmentQuestions)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const assignmentQuestionCount = assignmentQuestions.questions.length;
    const assignmentScoreDetail = yield Score_1.default.find({ assignment: assignment });
    const assignmentScoreDetailCount = assignmentScoreDetail.length;
    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus);
    const scores = assignmentQuestions.questions.map(a => a.score);
    const totalScore = scores.reduce((a, b) => a + b);
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score));
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100;
    let scoreBookSendingStatus;
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`;
        }
        else {
            scoreBookSendingStatus = `Incomplete`;
        }
    }
    else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Late`;
        }
        else {
            scoreBookSendingStatus = `Complete`;
        }
    }
    const existedScoreBook = yield ScoreBook_1.default.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] });
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    };
    if (!existedScoreBook) {
        const scoreBook = yield ScoreBook_1.default.create(scoreBookSchema);
    }
    if (existedScoreBook) {
        const updatedScoreBook = yield existedScoreBook.updateOne(scoreBookSchema);
    }
    const updatedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    res.status(201).json({
        success: true,
        detail: updatedScore
    });
}));
// @desc    Edit Score via datacamp
// @route   PUT /api/score/edit
// @access   Private
exports.EditScoreByString = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const studentId = user.id;
    const student = yield User_1.default.findById(studentId);
    const studentProfile = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const { course, assignment, question, score } = req.body;
    const code = req.body.answer;
    const existedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    if (!existedScore)
        return next(new errorResponse_1.default(`Please use POST API`, 400));
    fs_1.default.unlink(existedScore.answer.filepath, (err) => {
        if (err)
            throw err;
    });
    const filename = new Date().toISOString().replace(/[-T:\.Z]/g, "") + '_' + `${user.studentID}.py`;
    const destination = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`);
    const destinationFileName = path_1.default.join(`./uploads`, `answers`, `${req.body.course}`, `${req.body.assignment}`, `${req.body.question}`, `${filename}`);
    if (!fs_1.default.existsSync(destination)) {
        fs_1.default.mkdirSync(destination, { recursive: true });
    }
    fs_1.default.appendFile(destinationFileName, code, function (err) {
        if (err)
            throw err;
        console.log('Saved!');
    });
    let answer = {
        filename: filename,
        filepath: destinationFileName,
        code: code
    };
    const assignmnetDueDate = yield Assignment_1.default.findById(assignment).select('dueDate');
    if (!assignmnetDueDate)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const questionById = yield Question_1.default.findById(question);
    if (!questionById)
        return next(new errorResponse_1.default(`Don't have this question`, 400));
    const dueDate = Date.parse(assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString());
    assignmnetDueDate === null || assignmnetDueDate === void 0 ? void 0 : assignmnetDueDate.dueDate.toDateString();
    let sendingStatus;
    if (Date.now() <= dueDate) {
        sendingStatus = "Sent";
    }
    else {
        sendingStatus = "Late";
    }
    const scoreSchema = {
        course,
        student: studentId,
        assignment,
        question,
        sendingStatus,
        answer: answer,
        score
    };
    const scoreBook = yield existedScore.updateOne(scoreSchema);
    const assignmentQuestions = yield Assignment_1.default.findById(assignment).select('questions');
    if (!assignmentQuestions)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const assignmentQuestionCount = assignmentQuestions.questions.length;
    const assignmentScoreDetail = yield Score_1.default.find({ assignment: assignment });
    const assignmentScoreDetailCount = assignmentScoreDetail.length;
    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus);
    const scores = assignmentQuestions.questions.map(a => a.score);
    const totalScore = scores.reduce((a, b) => a + b);
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score));
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100;
    let scoreBookSendingStatus;
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`;
        }
        else {
            scoreBookSendingStatus = `Incomplete`;
        }
    }
    else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Complete`;
        }
        else {
            scoreBookSendingStatus = `Complete`;
        }
    }
    const existedScoreBook = yield ScoreBook_1.default.findOne({ "$and": [{ "student.studentID": user.studentID }, { assignment: assignment }] });
    const scoreBookSchema = {
        course,
        student: studentProfile,
        assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    };
    if (!existedScoreBook) {
        const scoreBook = yield ScoreBook_1.default.create(scoreBookSchema);
    }
    if (existedScoreBook) {
        const updatedScoreBook = yield existedScoreBook.updateOne(scoreBookSchema);
    }
    const updatedScore = yield Score_1.default.findOne({ "$and": [{ assignment: assignment }, { question: question }, { student: studentId }] });
    res.status(201).json({
        success: true,
        detail: updatedScore
    });
}));
// @desc    Edit score by score id
// @route   PUT /api/score/:id/editscore
// @access   Private
exports.EditScoreByScoreId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newScore = req.body.score;
    const scoreId = req.params.id;
    const answer = yield Score_1.default.findById(scoreId);
    if (!answer)
        return next(new errorResponse_1.default(`Bad input`, 400));
    const scoreSchema = {
        course: answer.course,
        student: answer.student,
        assignment: answer.assignment,
        question: answer.question,
        sendingStatus: answer.sendingStatus,
        answer: answer.answer,
        score: newScore
    };
    const newScoreDetail = yield answer.updateOne(scoreSchema);
    const assignmentQuestions = yield Assignment_1.default.findById(answer.assignment).select('questions');
    if (!assignmentQuestions)
        return next(new errorResponse_1.default(`Don't have this assignment`, 400));
    const assignmentQuestionCount = assignmentQuestions.questions.length;
    const assignmentScoreDetail = yield Score_1.default.find({ assignment: answer.assignment });
    const assignmentScoreDetailCount = assignmentScoreDetail.length;
    const sendingStatuses = assignmentScoreDetail.map(a => a.sendingStatus);
    const scores = assignmentQuestions.questions.map(a => a.score);
    const totalScore = scores.reduce((a, b) => a + b);
    const scoreBookScores = assignmentScoreDetail.map(a => parseInt(a.score));
    const scoreBookTotalScores = (scoreBookScores.reduce((a, b) => a + b) / totalScore) * 100;
    let scoreBookSendingStatus;
    if (assignmentScoreDetailCount < assignmentQuestionCount) {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Incomplete`;
        }
        else {
            scoreBookSendingStatus = `Incomplete`;
        }
    }
    else {
        if (sendingStatuses.includes('Late')) {
            scoreBookSendingStatus = `Complete`;
        }
        else {
            scoreBookSendingStatus = `Complete`;
        }
    }
    const student = yield User_1.default.findById(answer.student).select('-password');
    if (!student)
        return next(new errorResponse_1.default(`DB keep wrong data`, 500));
    const studentProfile = {
        studentID: student.studentID,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
    };
    const existedScoreBook = yield ScoreBook_1.default.findOne({ "$and": [{ "student.studentID": student.studentID }, { assignment: answer.assignment }] });
    const scoreBookSchema = {
        course: answer.course,
        student: studentProfile,
        assignment: answer.assignment,
        sendingStatus: scoreBookSendingStatus,
        score: scoreBookTotalScores
    };
    if (!existedScoreBook) {
        const scoreBook = yield ScoreBook_1.default.create(scoreBookSchema);
    }
    if (existedScoreBook) {
        const updatedScoreBook = yield existedScoreBook.updateOne(scoreBookSchema);
    }
    const updatedScore = yield Score_1.default.findOne({ "$and": [{ assignment: answer.assignment }, { question: answer.question }, { student: answer.student }] });
    res.status(201).json({
        success: true,
        detail: updatedScore
    });
}));
// @desc    Get all answer by assignment and studentId
// @route   GET /api/score/assignment/:id/student/:sid
// @access   Private
exports.GetAllAnswerByStudentIdForTeacher = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.sid;
    const assignmentId = req.params.id;
    const allAnswer = yield Score_1.default.find({ "$and": [{ student: studentId }, { assignment: assignmentId }] }).select('-answer');
    if (allAnswer.length === 0)
        return next(new errorResponse_1.default(`Bad input`, 400));
    res.status(201).json({
        success: true,
        detail: allAnswer
    });
}));
