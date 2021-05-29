import mongoose from "mongoose";
import IScoreBook from '../interfaces/ScoreBook'
const Schema = mongoose.Schema;

//Create Schema
const ScoreBookSchema = new Schema({
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
    sentDate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<IScoreBook>('scorebooks', ScoreBookSchema);