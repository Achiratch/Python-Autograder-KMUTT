"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const question_1 = require("../../controllers/question");
const auth_1 = require("../../middleware/auth");
const upload_1 = require("../../middleware/upload");
// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/create").post(auth_1.protect, upload_1.upload, question_1.CreateQuestion);
router.route("/").get(auth_1.protect, question_1.GetAllQuestion);
router.route("/:id").get(auth_1.protect, question_1.GetQuestionById);
router.route("/:id").delete(auth_1.protect, question_1.DeleteQuestionById);
router.route("/:id/edit").put(auth_1.protect, upload_1.upload, question_1.EditQuestion);
exports.default = router;
