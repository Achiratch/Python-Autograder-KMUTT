import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { CreateAssignment } from '../../controllers/assignment'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'
import { upload } from '../../middleware/upload'


// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/create").post(protect, CreateAssignment)
// router.route("/").get(protect, GetAllQuestion)
// router.route("/:id").get(protect, GetQuestionById)
// router.route("/:id").delete(protect, DeleteQuestionById)
// router.route("/:id/edit").put(protect, upload, EditQuestion)








export default router
