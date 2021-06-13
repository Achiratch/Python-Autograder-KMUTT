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
exports.AddStudentsToCourse = exports.GetAllStudentNotInCourse = exports.KickStudentFromCourse = exports.GetAllRegisterdCourses = exports.ResignCourse = exports.GetAllStudentInCourse = exports.RegisterCourse = void 0;
const async_1 = __importDefault(require("../middleware/async"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
// Load Course models
const CourseTaking_1 = __importDefault(require("../models/CourseTaking"));
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course"));
const is_empty_1 = __importDefault(require("../validation/is-empty"));
// @desc    Register course
// @route   POST /api/course/register
// @acess   Private
exports.RegisterCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const student = user.id;
    const studentDetail = yield User_1.default.findById(student);
    const { course, status } = req.body;
    try {
        let c = yield Course_1.default.findOne({ _id: course });
    }
    catch (_a) {
        return next(new errorResponse_1.default('We do not have this course!', 404));
    }
    let f = yield CourseTaking_1.default.findOne({ "$and": [{ 'student._id': studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail._id }, { course: course }] });
    if (f) {
        return next(new errorResponse_1.default('You already have taken this course', 401));
    }
    const StudentSchema = {
        _id: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail._id,
        studentID: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.studentID,
        email: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.email,
        firstName: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.firstName,
        lastName: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.lastName
    };
    const register_course = yield CourseTaking_1.default.create({
        course,
        student: StudentSchema,
        status,
    });
    res.status(401).json({
        success: true,
        detail: register_course
    });
}));
// @desc    Get All Register Info by courseId
// @route   GET /api/course/:id/students
// @acess   Private
exports.GetAllStudentInCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.params.id;
    const search = req.query.search;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    const queryArray = [];
    queryArray.push({ course: courseId });
    if (!is_empty_1.default(search))
        queryArray.push({ "$or": [{ "student.firstName": { $regex: search, $options: 'i' } }, { "student.email": { $regex: search } }] });
    console.log(queryArray);
    console.log(search);
    try {
        let c = yield Course_1.default.findOne({ _id: courseId });
    }
    catch (_b) {
        return next(new errorResponse_1.default('We do not have this course!', 404));
    }
    const allStudentInCourse = yield CourseTaking_1.default.find({ course: courseId });
    const allStudentInCourseCount = allStudentInCourse.length;
    let dataSearchCount;
    let courseTakingDetail;
    if (queryArray.length === 1) {
        courseTakingDetail = yield CourseTaking_1.default.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit);
        dataSearchCount = yield CourseTaking_1.default.find({ "$and": queryArray });
    }
    else {
        courseTakingDetail = yield CourseTaking_1.default.find({ "$and": queryArray })
            .skip(page > 0 ? ((page - 1) * limit) : 0)
            .limit(limit).exec();
        dataSearchCount = yield CourseTaking_1.default.find({ "$and": queryArray });
        res.status(200).json({
            success: true,
            data: courseTakingDetail,
            allStudents: allStudentInCourseCount,
            dataSearchCount: dataSearchCount
        });
    }
    if (courseTakingDetail.length === 0) {
        return next(new errorResponse_1.default('No student in this course', 404));
    }
    res.status(200).json({
        success: true,
        data: courseTakingDetail,
        allStudents: allStudentInCourseCount,
        dataSearchCount: dataSearchCount
    });
}));
// @desc    Resign Course
// @route   DELETE /api/course/resign/:id
// @acess   Private
exports.ResignCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseTakingId = req.params.id;
    const user = req.user;
    let c = yield CourseTaking_1.default.findById({ _id: courseTakingId });
    let student = c === null || c === void 0 ? void 0 : c.student;
    try {
        if (student != user.id) {
            return next(new errorResponse_1.default('You can remove your registered courses only!', 403));
        }
    }
    catch (_c) {
        return next(new errorResponse_1.default(`You didn't register this course`, 404));
    }
    console.log("before resign");
    let resign = yield CourseTaking_1.default.findOneAndRemove({ _id: courseTakingId });
    res.status(200).json({
        success: true,
        message: "You already have resigned this course!"
    });
}));
// @desc    Get All RegisterCourse by studentId
// @route   GET /api/course/student/:id
// @acess   Private
exports.GetAllRegisterdCourses = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const search = req.query.search;
    const semester = req.query.semester;
    const year = req.query.year;
    const queryArray = [];
    if (!is_empty_1.default(search))
        queryArray.push({ '$or': [{ courseID: { $regex: search, $options: 'i' } }, { courseName: { $regex: search, $options: 'i' } }] });
    if (!is_empty_1.default(semester))
        queryArray.push({ semester: semester });
    if (!is_empty_1.default(year))
        queryArray.push({ academicYear: year });
    let student = yield User_1.default.findOne({ _id: studentId });
    if (student === null) {
        return next(new errorResponse_1.default('We dont have this student!', 400));
    }
    const courseArray = [];
    try {
        let registerdCourses = yield CourseTaking_1.default.find({ 'student._id': studentId });
        if (registerdCourses.length === 0) {
            return next(new errorResponse_1.default(`You didn't register any courses!`, 404));
        }
        for (const r of registerdCourses) {
            const loopQueryArray = queryArray;
            loopQueryArray.push({ _id: String(r.course) });
            const course = yield Course_1.default.find({ '$and': loopQueryArray });
            if (course.length > 0) {
                courseArray.push(course[0]);
            }
            loopQueryArray.pop();
        }
        if (courseArray.length === 0) {
            return next(new errorResponse_1.default(`You didn't register any courses!`, 404));
        }
        res.status(200).json({
            success: true,
            courses: courseArray
        });
    }
    catch (error) {
        console.log(error);
        return next(new errorResponse_1.default(`You didn't register any courses!`, 404));
    }
}));
// @desc    Resign Course
// @route   DELETE /api/course/kick/:id
// @acess   Private
exports.KickStudentFromCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courseTakingId = req.params.id;
    const user = req.user;
    const owner = user.id;
    try {
        let c = yield CourseTaking_1.default.findOne({ _id: courseTakingId }).populate('course');
        if ((c === null || c === void 0 ? void 0 : c.course).createdBy != owner) {
            return next(new errorResponse_1.default('You can kick student in your course only', 403));
        }
    }
    catch (_d) {
        return next(new errorResponse_1.default(`This student didn't register this course`, 404));
    }
    let resign = yield CourseTaking_1.default.findOneAndRemove({ _id: courseTakingId });
    res.status(200).json({
        success: true,
        message: "You already have kicked this student from this course!"
    });
}));
// @desc    Get All UnRegisterd student by courseId
// @route   GET /api/course/:id/invite
// @acess   Private
exports.GetAllStudentNotInCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const course_id = req.params.id;
    const search = req.query.search;
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    // find registered students
    let courseTakingDetail = yield CourseTaking_1.default.find({ course: course_id }).select('student.studentID -_id');
    courseTakingDetail = courseTakingDetail.map((s) => s.student.studentID);
    if (courseTakingDetail.length === 0) {
        courseTakingDetail = [1];
    }
    const queryArray = [];
    queryArray.push({ studentID: { $nin: courseTakingDetail } });
    if (!is_empty_1.default(search))
        queryArray.push({ "$or": [{ "firstName": { $regex: search, $options: 'i' } }, { "email": { $regex: search } }] });
    let unregisteredStudent = yield User_1.default.find({ "$and": queryArray })
        .select('_id studentID email firstName lastName')
        .skip(page > 0 ? ((page - 1) * limit) : 0)
        .limit(limit);
    let unregisteredStudentCount = (yield User_1.default.find({ studentID: { $nin: courseTakingDetail } })).length;
    let unregisteredStudentSearchCount = yield (yield User_1.default.find({ "$and": queryArray })).length;
    res.status(200).json({
        success: true,
        data: unregisteredStudent,
        allStudents: unregisteredStudentCount,
        allSearchStudents: unregisteredStudentSearchCount
    });
}));
// @desc    Add students to course
// @route   POST /api/course/invite
// @acess   Private
exports.AddStudentsToCourse = async_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, status } = req.body;
    try {
        let c = yield Course_1.default.findOne({ _id: course });
    }
    catch (_e) {
        return next(new errorResponse_1.default('We do not have this course!', 404));
    }
    const students = JSON.parse(req.body.students);
    for (const student_id of students) {
        const studentDetail = yield User_1.default.findById(student_id);
        let f = yield CourseTaking_1.default.findOne({ "$and": [{ 'student._id': studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail._id }, { course: course }] });
        if (f) {
            return next(new errorResponse_1.default('You already have taken this course', 401));
        }
        let StudentSchema = {
            _id: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail._id,
            studentID: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.studentID,
            email: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.email,
            firstName: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.firstName,
            lastName: studentDetail === null || studentDetail === void 0 ? void 0 : studentDetail.lastName
        };
        let register_course = yield CourseTaking_1.default.create({
            course,
            student: StudentSchema,
            status,
        });
    }
    const updatedStudent = yield CourseTaking_1.default.find({ course: course });
    res.status(201).json({
        success: true,
        detail: updatedStudent
    });
}));
