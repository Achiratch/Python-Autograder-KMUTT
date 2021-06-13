"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//Create Schema
const ScoreSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'assignments',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required: true
    },
    sendingStatus: {
        type: String,
        requried: true
    },
    answer: {
        filename: {
            type: String,
            required: true
        },
        filepath: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
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
exports.default = mongoose_1.default.model('scores', ScoreSchema);
