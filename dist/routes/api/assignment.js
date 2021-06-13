"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const assignment_1 = require("../../controllers/assignment");
const auth_1 = require("../../middleware/auth");
const upload_1 = require("../../middleware/upload");
// @route POST api/users/register
// @desc Register user
// @acccess Public
router.route("/create").post(auth_1.protect, assignment_1.CreateAssignment);
router.route("/").get(auth_1.protect, assignment_1.GetAllAssignment);
router.route("/course/:id").get(auth_1.protect, assignment_1.GetAssignmentByCourseId);
router.route("/:id").get(auth_1.protect, assignment_1.GetAssignmentById);
router.route("/:id/questions").get(auth_1.protect, assignment_1.GetQuestionsByAssignmentId);
router.route("/:id/question/:questionId").get(auth_1.protect, assignment_1.GetQuestionByAssignmentIdAndQuestionId);
router.route("/:id").delete(auth_1.protect, assignment_1.DeleteAssignmentById);
router.route("/:id/update").put(auth_1.protect, upload_1.upload, assignment_1.UpdateAssignmentById);
exports.default = router;
