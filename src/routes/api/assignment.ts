import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { CreateAssignment, GetAllAssignment, GetAssignmentById, DeleteAssignmentById, UpdateAssignmentById } from '../../controllers/assignment'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'
import { upload } from '../../middleware/upload'


// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/create").post(protect, CreateAssignment)
router.route("/").get(protect, GetAllAssignment)
router.route("/:id").get(protect, GetAssignmentById)
router.route("/:id").delete(protect, DeleteAssignmentById)
router.route("/:id/update").put(protect, upload, UpdateAssignmentById)








export default router
