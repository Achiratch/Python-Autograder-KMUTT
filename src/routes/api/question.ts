import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { CreateQuestion } from '../../controllers/question'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'
import { upload } from '../../middleware/upload'


// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/add").post(protect, upload, CreateQuestion)




export default router
