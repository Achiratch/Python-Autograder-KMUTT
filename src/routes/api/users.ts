import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import { Login, Register, GetUsersInfo, EditRole } from '../../controllers/user'
import { Authorize } from '../../_helpers/authorize'
import ROLE from '../../models/Role'
import { protect } from '../../middleware/auth'


// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/register").post(Register)

// @route POST api/users/login
// @desc login user / Return JWT Token
// @acccess Public
router.route("/login").post(Login)

router.route("/role/edit").put(protect, EditRole)
router.route("/").get(protect, GetUsersInfo)


export default router
