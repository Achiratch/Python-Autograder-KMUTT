import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { createCourse, GetAllCourse, GetCourseById, DeleteCourseById, UpdateCourseById, GetAllCourseByCreator } from '../../controllers/course'
import { GetAllStudentInCourse, RegisterCourse, GetAllRegisterdCourses, KickStudentFromCourse, ResignCourse } from '../../controllers/courseTaking'

import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import passport from "passport";
import { protect } from '../../middleware/auth'


router.route("/").post(protect, createCourse)
router.route("/").get(protect, GetAllCourse)
router.route("/teacher/:id").get(protect, GetAllCourseByCreator)
router.route("/:id").get(protect, GetCourseById)
router.route("/:id").delete(protect, DeleteCourseById)
router.route("/:id/update").put(protect, UpdateCourseById)

//CourseTaking (about course register)
router.route("/register").post(protect, RegisterCourse)
router.route("/:id/students").get(protect, GetAllStudentInCourse)
router.route("/student/:id").get(protect, GetAllRegisterdCourses)
router.route("/kick/:id").delete(protect, KickStudentFromCourse)
router.route("/resign/:id").delete(protect, ResignCourse)








export default router
