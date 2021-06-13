"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const score_1 = require("../../controllers/score");
const auth_1 = require("../../middleware/auth");
const studentUpload_1 = require("../../middleware/studentUpload");
router.route("/create/upload").post(auth_1.protect, studentUpload_1.studentUpload, score_1.CreateScoreByUpload);
router.route("/create").post(auth_1.protect, score_1.CreateScoreByString);
router.route("/student/assignment/:id").get(auth_1.protect, score_1.GetAllAnswerByStudentId);
router.route("/assignment/:id/student/:sid").get(auth_1.protect, score_1.GetAllAnswerByStudentId);
router.route("/:id").get(auth_1.protect, score_1.GetAnswerByScoreId);
router.route("/student/course/:id/status").get(auth_1.protect, score_1.GetSendingStatusByStudentId);
router.route("/course/:id/assignment/:aid/status").get(auth_1.protect, score_1.GetSendingStatusByCourseId);
router.route("/edit/upload").put(auth_1.protect, studentUpload_1.studentUpload, score_1.EditScoreByUpload);
router.route("/edit").put(auth_1.protect, score_1.EditScoreByString);
router.route("/:id/editscore").put(auth_1.protect, score_1.EditScoreByScoreId);
// router.route("/").get(protect, GetAllQuestion)
// router.route("/:id").get(protect, GetQuestionById)
// router.route("/:id").delete(protect, DeleteQuestionById)
// router.route("/:id/edit").put(protect, upload, EditQuestion)
exports.default = router;
