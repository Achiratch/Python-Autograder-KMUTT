"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const course_1 = require("../../controllers/course");
const courseTaking_1 = require("../../controllers/courseTaking");
const auth_1 = require("../../middleware/auth");
router.route("/").post(auth_1.protect, course_1.createCourse);
router.route("/").get(auth_1.protect, course_1.GetAllCourse);
router.route("/teacher/:id").get(auth_1.protect, course_1.GetAllCourseByCreator);
router.route("/:id").get(auth_1.protect, course_1.GetCourseById);
router.route("/:id").delete(auth_1.protect, course_1.DeleteCourseById);
router.route("/:id/update").put(auth_1.protect, course_1.UpdateCourseById);
//CourseTaking (about course register)
router.route("/register").post(auth_1.protect, courseTaking_1.RegisterCourse);
router.route("/invite").post(auth_1.protect, courseTaking_1.AddStudentsToCourse);
router.route("/:id/students").get(auth_1.protect, courseTaking_1.GetAllStudentInCourse);
router.route("/:id/invite").get(auth_1.protect, courseTaking_1.GetAllStudentNotInCourse);
router.route("/student/:id").get(auth_1.protect, courseTaking_1.GetAllRegisterdCourses);
router.route("/kick/:id").delete(auth_1.protect, courseTaking_1.KickStudentFromCourse);
router.route("/resign/:id").delete(auth_1.protect, courseTaking_1.ResignCourse);
exports.default = router;
