"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const StudentSchema = new Schema({
    studentID: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        requried: true
    },
});
//Create Schema
const CourseTakingSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    student: StudentSchema,
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
});
exports.default = mongoose_1.default.model('courseTakings', CourseTakingSchema);
