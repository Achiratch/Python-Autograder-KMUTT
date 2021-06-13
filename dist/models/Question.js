"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TeacherSchema = new Schema({
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
        required: true
    },
});
//Create Schema
const QuestionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sct: {
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
    solution: {
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
    sample: {
        filename: {
            type: String,
        },
        filepath: {
            type: String,
        },
        code: {
            type: String,
        }
    },
    preExercise: {
        filename: {
            type: String,
        },
        filepath: {
            type: String,
        },
        code: {
            type: String,
        }
    },
    createdBy: TeacherSchema,
    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
});
exports.default = mongoose_1.default.model('questions', QuestionSchema);
