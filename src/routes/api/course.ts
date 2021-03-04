import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { createCourse, GetAllCourse, GetCourseById, DeleteCourseById } from '../../controllers/course'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import passport from "passport";
import { protect } from '../../middleware/auth'


router.route("/course").post(protect, createCourse)
router.route("/course").get(protect, GetAllCourse)
router.route("/course/:id").get(protect, GetCourseById)
router.route("/course/:id").delete(protect, DeleteCourseById)
router.route("/course/:id/update").put(protect, DeleteCourseById)






export default router
