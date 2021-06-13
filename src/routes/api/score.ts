import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { CreateScoreByUpload, CreateScoreByString, GetAllAnswerByStudentId, GetAnswerByScoreId, GetSendingStatusByStudentId, GetSendingStatusByCourseId, EditScoreByScoreId, EditScoreByString, EditScoreByUpload, GetAllAnswerByStudentIdForTeacher } from '../../controllers/score'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'
import { studentUpload } from '../../middleware/studentUpload'



router.route("/create/upload").post(protect, studentUpload, CreateScoreByUpload)
router.route("/create").post(protect, CreateScoreByString)
router.route("/student/assignment/:id").get(protect, GetAllAnswerByStudentId)
router.route("/assignment/:id/student/:sid").get(protect, GetAllAnswerByStudentId)
router.route("/:id").get(protect, GetAnswerByScoreId)
router.route("/student/course/:id/status").get(protect, GetSendingStatusByStudentId)
router.route("/course/:id/assignment/:aid/status").get(protect, GetSendingStatusByCourseId)
router.route("/edit/upload").put(protect, studentUpload, EditScoreByUpload)
router.route("/edit").put(protect, EditScoreByString)
router.route("/:id/editscore").put(protect, EditScoreByScoreId)




// router.route("/").get(protect, GetAllQuestion)
// router.route("/:id").get(protect, GetQuestionById)
// router.route("/:id").delete(protect, DeleteQuestionById)
// router.route("/:id/edit").put(protect, upload, EditQuestion)








export default router
