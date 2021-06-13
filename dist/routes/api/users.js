"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../../controllers/user");
const auth_1 = require("../../middleware/auth");
// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/register").post(user_1.Register);
// @route POST api/users/login
// @desc login user / Return JWT Token
// @acccess Public
router.route("/login").post(user_1.Login);
router.route("/role/edit").put(auth_1.protect, user_1.EditRole);
router.route("/").get(auth_1.protect, user_1.GetUsersInfo);
exports.default = router;
