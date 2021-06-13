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
exports.DeleteCourseById = exports.UpdateCourseById = exports.GetCourseById = exports.GetAllCourseByCreator = exports.GetAllCourse = exports.createCourse = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// Load Course models
const Course_1 = __importDefault(require("../models/Course"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
// @desc    Create course
// @route   POST /api/course
// @acess   Private
exports.createCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseID, courseName, courseDescription, semester, academicYear, dateCreate } = req.body;
    const user = req.user;
    const createdBy = user.id;
    let c = yield Course_1.default.findOne({ courseID: courseID.toUpperCase(), academicYear: academicYear, semester: semester });
    if (c !== null) {
        return next(new errorResponse_1.default('This courseID is already existed on this semester!', 400));
    }
    const created_course = yield Course_1.default.create({
        courseID,
        courseName,
        courseDescription,
        semester,
        academicYear,
        dateCreate,
        createdBy
    });
    res.status(201).json(created_course);
}));
// @desc    Get all course
// @route   GET /api/course
// @acess   Private
exports.GetAllCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const semester = req.query.semester;
    const year = req.query.year;
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ '$or': [{ courseID: { $regex: search, $options: 'i' } }, { courseName: { $regex: search, $options: 'i' } }] });
    if (!is_empty_1.default(semester))
        queryArray.push({ semester: semester });
    if (!is_empty_1.default(year))
        queryArray.push({ academicYear: year });
    let courses;
    try {
        if (queryArray.length === 0) {
            courses = yield Course_1.default.find().populate('createdBy', ['firstName', 'lastName']);
        }
        else {
            courses = yield Course_1.default.find({ "$and": queryArray })
                .skip(page > 0 ? ((page - 1) * limit) : 0)
                .limit(limit)
                .populate('createdBy', ['firstName', 'lastName']);
        }
        res.status(201).json(courses);
    }
    catch (error) {
        console.log(error);
        return next(new errorResponse_1.default('No course found', 404));
    }
}));
// @desc    Get all course
// @route   GET /api/course/teacher/:id
// @acess   Private
exports.GetAllCourseByCreator = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const search = req.query.search;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const semester = req.query.semester;
    const year = req.query.year;
    const queryArray = [];
    queryArray.push({ createdBy: userId });
    if (!is_empty_1.default(search))
        queryArray.push({ '$or': [{ courseID: { $regex: search, $options: 'i' } }, { courseName: { $regex: search, $options: 'i' } }] });
    if (!is_empty_1.default(semester))
        queryArray.push({ semester: semester });
    if (!is_empty_1.default(year))
        queryArray.push({ academicYear: year });
    let courses;
    try {
        if (queryArray.length === 1) {
            courses = yield Course_1.default.find(queryArray).populate('createdBy', ['firstName', 'lastName']);
        }
        else {
            courses = yield Course_1.default.find({ "$and": queryArray })
                .skip(page > 0 ? ((page - 1) * limit) : 0)
                .limit(limit)
                .populate('createdBy', ['firstName', 'lastName']);
        }
        res.status(201).json({
            success: true,
            data: courses
        });
    }
    catch (error) {
        console.log(error);
        return next(new errorResponse_1.default('No course that created by this user found', 404));
    }
}));
// @desc    Get course by id
// @route   GET /api/course/:id
// @acess   Private
exports.GetCourseById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield Course_1.default.findById(req.params.id);
        res.status(201).json(courses);
    }
    catch (_a) {
        return next(new errorResponse_1.default('No course with that id', 404));
    }
}));
// @desc    Update course by id
// @route   PUT /api/course/:id/update
// @acess   Private
exports.UpdateCourseById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseID, courseName, courseDescription, semester, academicYear, dateCreate } = req.body;
    const user = req.user;
    const createdBy = user.id;
    let courses = yield Course_1.default.findById(req.params.id);
    if (!courses) {
        return next(new errorResponse_1.default('No course with that id', 404));
    }
    if ((courses === null || courses === void 0 ? void 0 : courses.createdBy) != user.id) {
        return next(new errorResponse_1.default(`Only course owner can update course detail`, 403));
    }
    let update = yield courses.updateOne({
        courseID,
        courseName,
        courseDescription,
        semester,
        academicYear,
        createdBy
    });
    let updatedCourse = yield Course_1.default.findById(req.params.id);
    res.status(200).json({
        success: true,
        message: updatedCourse
    });
}));
// @desc    Delete course by id
// @route   DELETE /api/course/:id
// @acess   Private
exports.DeleteCourseById = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let courses = yield Course_1.default.findById(req.params.id);
    if (!courses) {
        return next(new errorResponse_1.default('No course with that id', 404));
    }
    if ((courses === null || courses === void 0 ? void 0 : courses.createdBy) != user.id) {
        return next(new errorResponse_1.default(`Only course owner can delete course`, 403));
    }
    let remove = yield (courses === null || courses === void 0 ? void 0 : courses.remove());
    res.status(200).json({
        success: true,
        message: "This course already has removed from db"
    });
}));
