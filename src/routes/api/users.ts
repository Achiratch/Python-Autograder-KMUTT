import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { Login, Register } from '../../controllers/user'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'

// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/register").post(Register)

// @route POST api/users/login
// @desc login user / Return JWT Token
// @acccess Public
router.route("/login").post(Login)


export default router
