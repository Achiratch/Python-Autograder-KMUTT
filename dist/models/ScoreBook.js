"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//Create Schema
const ScoreBookSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    student: {
        studentID: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'assignments',
        required: true
    },
    sendingStatus: {
        type: String,
        requried: true
    },
    score: {
        type: String,
        required: true,
    },
    sentDate: {
        type: Date,
        default: Date.now()
    },
});
exports.default = mongoose_1.default.model('scorebooks', ScoreBookSchema);
