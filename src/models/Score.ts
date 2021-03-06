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
    sendingStatus: {
        type: String,
        requried: true
    },
    score: {
        type: String,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<IScore>('score', ScoreSchema);