import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { CreateScoreByUpload, CreateScoreByString, GetAllAnswerByStudentId, GetAnswerByScoreId, GetSendingStatusByStudentId, GetSendingStatusByCourseId } from '../../controllers/score'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'
import { studentUpload } from '../../middleware/studentUpload'



router.route("/create/upload").post(protect, studentUpload, CreateScoreByUpload)
router.route("/create").post(protect, CreateScoreByString)
router.route("/student/assignment/:id").get(protect, GetAllAnswerByStudentId)
router.route("/:id").get(protect, GetAnswerByScoreId)
router.route("/student/course/:id/status").get(protect, GetSendingStatusByStudentId)
router.route("/course/:id/status").get(protect, GetSendingStatusByCourseId)


// router.route("/").get(protect, GetAllQuestion)
// router.route("/:id").get(protect, GetQuestionById)
// router.route("/:id").delete(protect, DeleteQuestionById)
// router.route("/:id/edit").put(protect, upload, EditQuestion)








export default router
