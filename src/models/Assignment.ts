import mongoose from "mongoose";
import IAssignment from '../interfaces/Assignment'
const Schema = mongoose.Schema;

//Create Schema
const AssignmentSchema = new Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',
        required: true

    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    type: {
        type: String,
        enum: ['exam', 'default'],
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