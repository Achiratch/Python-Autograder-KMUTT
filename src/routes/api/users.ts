import express, { Request, Response, Application, NextFunction } from "express";
const router = express.Router();
import controller from '../../controllers/user'

// @route POST api/users/register
// @desc Register user
// @acccess Public
router.post("/register", controller.Register)

// @route POST api/users/login
// @desc login user / Return JWT Token
// @acccess Public
router.post("/login", controller.Login)


export default router
