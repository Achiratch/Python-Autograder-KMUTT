import mongoose from "mongoose";
import IAssignment, { IQuestionDetail } from '../interfaces/Assignment'
const Schema = mongoose.Schema;

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
                type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<IAssignment>('assignments', AssignmentSchema);