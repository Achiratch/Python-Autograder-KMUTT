"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//Create Schema
const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: {
        type: [{
                _id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    required: true
                },
                score: {
                    type: Number,
                    required: true
                },
            }],
        required: true
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    createdBy: {
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
    type: {
        type: String,
        enum: ['Exam', 'Assignment'],
        required: true
    },
    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        requried: true
    },
    totalScore: {
        type: Number,
        default: 100,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.default.model('assignments', AssignmentSchema);
