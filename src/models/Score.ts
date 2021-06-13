import mongoose from "mongoose";
import IScore from '../interfaces/Score'
const Schema = mongoose.Schema;

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

export default mongoose.model<IScore>('scores', ScoreSchema);