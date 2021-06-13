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
exports.EditQuestion = exports.DeleteQuestionById = exports.GetAllQuestion = exports.GetQuestionById = exports.CreateQuestion = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../models/User"));
const Assignment_1 = __importDefault(require("../models/Assignment"));
const Question_1 = __importDefault(require("../models/Question"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
// @desc    Create Question
// @route   POST /api/question/create
// @acess   Private
exports.CreateQuestion = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const teacherId = user.id;
    const teacher = yield User_1.default.findById(teacherId);
    const files = req.files;
    if (!files) {
        return next(new errorResponse_1.default('please upload files', 400));
    }
    let solution;
    let sct;
    let preExercise;
    let sample;
    solution = files['solution'][0];
    let solutionDesc = {
        filename: solution.originalname,
        filepath: solution.path,
        code: fs_1.default.readFileSync(solution.path, 'utf8')
    };
    sct = files['sct'][0];
    let sctDesc = {
        filename: sct.originalname,
        filepath: sct.path,
        code: fs_1.default.readFileSync(sct.path, 'utf8')
    };
    let preExerciseDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['preExercise']) {
        preExercise = files['preExercise'][0];
        preExerciseDesc = {
            filename: preExercise.originalname,
            filepath: preExercise.path,
            code: fs_1.default.readFileSync(preExercise.path, 'utf8')
        };
    }
    let sampleDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['sample'] !== undefined) {
        sample = files['sample'][0];
        sampleDesc = {
            filename: sample.originalname,
            filepath: sample.path,
            code: fs_1.default.readFileSync(sample.path, 'utf8')
        };
    }
    const { name, level, description } = req.body;
    const TeacherSchema = {
        _id: teacher === null || teacher === void 0 ? void 0 : teacher._id,
        studentID: teacher === null || teacher === void 0 ? void 0 : teacher.studentID,
        email: teacher === null || teacher === void 0 ? void 0 : teacher.email,
        firstName: teacher === null || teacher === void 0 ? void 0 : teacher.firstName,
        lastName: teacher === null || teacher === void 0 ? void 0 : teacher.lastName
    };
    const questionSchema = {
        name,
        description,
        createdBy: TeacherSchema,
        level,
        sct: sctDesc,
        solution: solutionDesc,
        sample: sampleDesc,
        preExercise: preExerciseDesc
    };
    const question = yield Question_1.default.create(questionSchema);
    res.status(201).json({
        success: true,
        detail: question
    });
}));
// @desc    Get Question by id
// @route   GET /api/question/:id
// @acess   Private
exports.GetQuestionById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionId = req.params.id;
    const question = yield Question_1.default.findById(questionId);
    res.status(200).json({
        success: true,
        detail: question
    });
}));
// @desc    Get all Question 
// @route   GET /api/question/
// @acess   Private
exports.GetAllQuestion = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const level = req.query.level;
    const search = req.query.search;
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ name: { $regex: search, $options: 'i' } });
    if (!is_empty_1.default(level))
        queryArray.push({ level: level });
    let question;
    let questionSearchCount;
    if (queryArray.length > 0) {
        question = yield Question_1.default.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        questionSearchCount = yield (yield Question_1.default.find({ "$and": queryArray })).length;
    }
    else {
        question = yield Question_1.default.find()
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        questionSearchCount = yield (yield Question_1.default.find()).length;
    }
    const questionCount = (yield Question_1.default.estimatedDocumentCount()).toFixed();
    console.log(questionCount);
    res.status(200).json({
        success: true,
        detail: question,
        count: questionCount,
        searchCount: questionSearchCount
    });
}));
// @desc    DELETE Question by id
// @route   DELETE /api/question/:id
// @acess   Private
exports.DeleteQuestionById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const questionId = req.params.id;
    const question = yield Question_1.default.findById(questionId);
    if (!question) {
        return next(new errorResponse_1.default('No question with that id', 404));
    }
    const assignment = yield Assignment_1.default.find({ "questions._id": questionId });
    console.log(assignment);
    if (assignment.length > 0) {
        return next(new errorResponse_1.default('This question is in assignment, please delete assignment first!', 400));
    }
    fs_1.default.unlink(question === null || question === void 0 ? void 0 : question.solution.filepath, (err) => {
        if (err)
            throw err;
    });
    fs_1.default.unlink(question === null || question === void 0 ? void 0 : question.sct.filepath, (err) => {
        if (err)
            throw err;
    });
    if (!is_empty_1.default(question === null || question === void 0 ? void 0 : question.sample.filepath)) {
        fs_1.default.unlink(question === null || question === void 0 ? void 0 : question.sample.filepath, (err) => {
            if (err)
                throw err;
        });
    }
    if (!is_empty_1.default(question.preExercise.filepath)) {
        fs_1.default.unlink(question === null || question === void 0 ? void 0 : question.preExercise.filepath, (err) => {
            if (err)
                throw err;
        });
    }
    const deleteQuestion = yield question.remove();
    res.status(200).json({
        success: true,
        message: "Question is removed from db!"
    });
}));
// @desc    Update Question
// @route   PUT /api/question/create
// @acess   Private
exports.EditQuestion = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const teacherId = user.id;
    const teacher = yield User_1.default.findById(teacherId);
    const files = req.files;
    if (!files) {
        return next(new errorResponse_1.default('please upload files', 400));
    }
    let question = yield Question_1.default.findById(req.params.id);
    if (!question)
        return next(new errorResponse_1.default(`We don't have this question id`, 400));
    let solution;
    let sct;
    let preExercise;
    let sample;
    let solutionDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['solution']) {
        fs_1.default.unlink(question.solution.filepath, (err) => {
            if (err)
                throw err;
        });
        solution = files['solution'][0];
        solutionDesc = {
            filename: solution.originalname,
            filepath: solution.path,
            code: fs_1.default.readFileSync(solution.path, 'utf8')
        };
    }
    else {
        solutionDesc = question.sct;
    }
    let sctDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['sct']) {
        fs_1.default.unlink(question.sct.filepath, (err) => {
            if (err)
                throw err;
        });
        sct = files['sct'][0];
        sctDesc = {
            filename: sct.originalname,
            filepath: sct.path,
            code: fs_1.default.readFileSync(sct.path, 'utf8')
        };
    }
    else {
        sctDesc = question.sct;
    }
    let preExerciseDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['preExercise']) {
        fs_1.default.unlink(question.preExercise.filepath, (err) => {
            if (err)
                throw err;
        });
        preExercise = files['preExercise'][0];
        preExerciseDesc = {
            filename: preExercise.originalname,
            filepath: preExercise.path,
            code: fs_1.default.readFileSync(preExercise.path, 'utf8')
        };
    }
    else {
        preExerciseDesc = question.preExercise;
    }
    let sampleDesc = {
        filename: "",
        filepath: "",
        code: ""
    };
    if (files['sample'] !== undefined) {
        fs_1.default.unlink(question.sample.filepath, (err) => {
            if (err)
                throw err;
        });
        sample = files['sample'][0];
        sampleDesc = {
            filename: sample.originalname,
            filepath: sample.path,
            code: fs_1.default.readFileSync(sample.path, 'utf8')
        };
    }
    else {
        sampleDesc = question.sample;
    }
    let { name, level, description } = req.body;
    if (is_empty_1.default(name))
        name = question.name;
    if (is_empty_1.default(level))
        level = question.level;
    if (is_empty_1.default(description))
        description = question.description;
    const questionCreatedBy = question.createdBy;
    const TeacherSchema = {
        _id: teacher === null || teacher === void 0 ? void 0 : teacher._id,
        studentID: teacher === null || teacher === void 0 ? void 0 : teacher.studentID,
        email: teacher === null || teacher === void 0 ? void 0 : teacher.email,
        firstName: teacher === null || teacher === void 0 ? void 0 : teacher.firstName,
        lastName: teacher === null || teacher === void 0 ? void 0 : teacher.lastName
    };
    const questionSchema = {
        name,
        description,
        createdBy: questionCreatedBy,
        level,
        sct: sctDesc,
        solution: solutionDesc,
        sample: sampleDesc,
        preExercise: preExerciseDesc
    };
    const updated = yield question.updateOne(questionSchema);
    let updatedQuestion = yield Question_1.default.findById(req.params.id);
    console.log(updated);
    res.status(200).json({
        success: true,
        detail: updatedQuestion
    });
}));
