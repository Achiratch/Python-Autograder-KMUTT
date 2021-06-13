"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//Create Schema
const CourseSchema = new Schema({
    courseID: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        requried: true
    },
    academicYear: {
        type: Number,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now(),
        requried: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});
CourseSchema.pre('save', function (next) {
    this.courseID = this.courseID.toUpperCase();
    next();
});
exports.default = mongoose_1.default.model('courses', CourseSchema);
