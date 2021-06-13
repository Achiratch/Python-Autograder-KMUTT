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
exports.GetQuestionByAssignmentIdAndQuestionId = exports.GetQuestionsByAssignmentId = exports.GetAssignmentByCourseId = exports.UpdateAssignmentById = exports.DeleteAssignmentById = exports.GetAllAssignment = exports.GetAssignmentById = exports.CreateAssignment = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// Load Course models
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
const Assignment_1 = __importDefault(require("../models/Assignment"));
const Question_1 = __importDefault(require("../models/Question"));
const is_dulplicateInArray_1 = __importDefault(require("../validation/is-dulplicateInArray"));
// @desc    Create assignment
// @route   POST /api/assignment/create
// @acess   Private
exports.CreateAssignment = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, course, dueDate, totalScore, level, type } = req.body;
    try {
        let courses = yield Course_1.default.findById(course);
    }
    catch (_a) {
        return next(new errorResponse_1.default('No course with that id', 400));
    }
    const user = yield User_1.default.findById(req.user.id).select('studentID firstName lastName email -_id');
    const createdBy = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    const questions = JSON.parse(req.body.questions);
    const questionIdArray = questions.map(q => q._id);
    const IsDulpicateQuestionExist = is_dulplicateInArray_1.default(questionIdArray);
    if (IsDulpicateQuestionExist) {
        return next(new errorResponse_1.default(`Don't insert dulpicate question in same assignment`, 400));
    }
    const checkExistQuestion = () => __awaiter(void 0, void 0, void 0, function* () {
        let loopError = 0;
        for (const question of questions) {
            const IsQuestion = yield Question_1.default.findById(question._id);
            if (!IsQuestion) {
                loopError++;
            }
        }
        return loopError;
    });
    const notExistQuestion = yield checkExistQuestion();
    if (notExistQuestion > 0)
        return next(new errorResponse_1.default('Please input valid question id', 400));
    const assignment = yield Assignment_1.default.create({
        name,
        description,
        course,
        createdBy: user,
        questions,
        dueDate,
        totalScore,
        level,
        type
    });
    res.status(201).json({
        success: true,
        detail: assignment
    });
}));
// @desc    Get Assignment by id
// @route   GET /api/assignment/:id
// @acess   Private
exports.GetAssignmentById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = req.params.id;
    const assignment = yield Assignment_1.default.findById(assignmentId);
    if (!assignment)
        return next(new errorResponse_1.default(`We don't have this assignment`, 404));
    res.status(200).json({
        success: true,
        detail: assignment
    });
}));
// @desc    Get all Assignment 
// @route   GET /api/assignment/
// @acess   Private
exports.GetAllAssignment = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const level = req.query.level;
    const search = req.query.search;
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ name: { $regex: search, $options: 'i' } });
    if (!is_empty_1.default(level))
        queryArray.push({ level: level });
    let assignment;
    let assignmentSearchCount;
    if (queryArray.length > 0) {
        assignment = yield Assignment_1.default.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        assignmentSearchCount = yield (yield Assignment_1.default.find({ "$and": queryArray })).length;
    }
    else {
        assignment = yield Assignment_1.default.find()
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        assignmentSearchCount = yield (yield Assignment_1.default.find()).length;
    }
    const assignmentCount = (yield Assignment_1.default.estimatedDocumentCount()).toFixed();
    res.status(200).json({
        success: true,
        detail: assignment,
        count: assignmentCount,
        searchCount: assignmentSearchCount
    });
}));
// @desc    DELETE Assignment by id
// @route   DELETE /api/assignment/:id
// @acess   Private
exports.DeleteAssignmentById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = req.params.id;
    const assignment = yield Assignment_1.default.findById(assignmentId);
    if (!assignment) {
        return next(new errorResponse_1.default('No assignment with that id', 404));
    }
    const deleteAssignment = yield assignment.remove();
    res.status(200).json({
        success: true,
        message: "Assignment is removed from db!"
    });
}));
// @desc    Update assignment by id
// @route   PUT /api/assignment/:id/update
// @acess   Private
exports.UpdateAssignmentById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, course, dueDate, totalScore, level, type } = req.body;
    const assignmentId = req.params.id;
    const assignment = yield Assignment_1.default.findById(assignmentId);
    if (!assignment) {
        return next(new errorResponse_1.default('No assignment with that id', 404));
    }
    if (is_empty_1.default(name))
        name = assignment.name;
    if (is_empty_1.default(description))
        description = assignment.description;
    if (is_empty_1.default(course))
        course = assignment.course;
    if (is_empty_1.default(dueDate))
        dueDate = assignment.dueDate;
    if (is_empty_1.default(totalScore))
        totalScore = assignment.totalScore;
    if (is_empty_1.default(level))
        level = assignment.level;
    if (is_empty_1.default(type))
        type = assignment.type;
    try {
        let courses = yield Course_1.default.findById(course);
    }
    catch (_b) {
        return next(new errorResponse_1.default('No course with that id', 400));
    }
    const user = yield User_1.default.findById(req.user.id).select('studentID firstName lastName email -_id');
    const editedBy = {
        studentID: user.studentID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
    let questions = JSON.parse(req.body.questions);
    if (is_empty_1.default(questions))
        questions = assignment.questions;
    const questionIdArray = questions.map(q => q._id);
    const IsDulpicateQuestionExist = is_dulplicateInArray_1.default(questionIdArray);
    if (IsDulpicateQuestionExist) {
        return next(new errorResponse_1.default(`Don't insert dulpicate question in same assignment`, 400));
    }
    questions.forEach((question) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(question);
            const IsQuestion = yield Question_1.default.findById(question._id);
            if (!IsQuestion) {
                return next(new errorResponse_1.default('Please input valid question id!!', 400));
            }
        }
        catch (_c) {
            return next(new errorResponse_1.default('Please input valid question id!!', 400));
        }
    }));
    const update = yield assignment.updateOne({
        name,
        description,
        course,
        createdBy: assignment.createdBy,
        questions,
        dueDate,
        totalScore,
        level,
        type
    });
    const updatedAssignment = yield Assignment_1.default.findById(assignmentId);
    res.status(201).json({
        success: true,
        detail: updatedAssignment
    });
}));
// @desc    Get Assignment by course id
// @route   GET /api/assignment/course/:id
// @acess   Private
exports.GetAssignmentByCourseId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const level = req.query.level;
    const search = req.query.search;
    const existCourse = yield Course_1.default.findById(courseId);
    if (!existCourse)
        return next(new errorResponse_1.default(`We don't have this course`, 404));
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ name: { $regex: search, $options: 'i' } });
    if (!is_empty_1.default(level))
        queryArray.push({ level: level });
    queryArray.push({ course: courseId });
    let assignment;
    let assignmentSearchCount;
    if (queryArray.length > 0) {
        assignment = yield Assignment_1.default.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        assignmentSearchCount = (yield Assignment_1.default.find({ "$and": queryArray })).length;
    }
    const assignmentCount = (yield Assignment_1.default.estimatedDocumentCount()).toFixed();
    res.status(200).json({
        success: true,
        detail: assignment,
        count: assignmentCount,
        searchCount: assignmentSearchCount
    });
}));
// @desc    Get Assignment by id
// @route   GET /api/assignment/:id/questions
// @acess   Private
exports.GetQuestionsByAssignmentId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = req.params.id;
    const assignment = yield Assignment_1.default.findById(assignmentId);
    if (!assignment)
        return next(new errorResponse_1.default(`We don't have this assignment`, 404));
    const questions = assignment.questions;
    const questionsId = questions.map(q => q._id);
    let questionsDetail = [];
    for (const q of questions) {
        let question = yield Question_1.default.findById(q._id);
        if (question) {
            let leanQuestion = question.toObject();
            leanQuestion.score = q.score;
            questionsDetail.push(leanQuestion);
        }
    }
    const questionsCount = questionsDetail.length;
    res.status(200).json({
        success: true,
        detail: questionsDetail,
        count: questionsCount
    });
}));
// @desc    Get question in assignment
// @route   GET /api/assignment/:id/question
// @acess   Private
exports.GetQuestionByAssignmentIdAndQuestionId = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = req.params.id;
    const questionId = req.params.questionId;
    let thisQuestion = yield Question_1.default.findById(questionId);
    if (!thisQuestion)
        return next(new errorResponse_1.default(`We don't have this question`, 404));
    const assignment = yield Assignment_1.default.findById(assignmentId);
    if (!assignment)
        return next(new errorResponse_1.default(`We don't have this assignment`, 404));
    const questions = assignment.questions;
    const questionsId = questions.map(q => q._id);
    let questionsDetail = [];
    for (const q of questions) {
        if (String(q._id) === String(thisQuestion._id)) {
            let question = yield Question_1.default.findById(q._id);
            if (question) {
                let leanQuestion = question.toObject();
                leanQuestion.score = q.score;
                questionsDetail.push(leanQuestion);
            }
        }
    }
    res.status(200).json({
        success: true,
        detail: questionsDetail,
    });
}));
