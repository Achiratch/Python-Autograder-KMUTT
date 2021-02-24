import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { createCourse } from '../../controllers/course'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import passport from "passport";

// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/course").post(passport.authenticate('jwt', { session: false }), createCourse)



export default router
