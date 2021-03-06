import mongoose from "mongoose";
import IQuestion from '../interfaces/Question'
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({


    assignment: {
        type: Schema.Types.ObjectId,
        ref: 'assignment',
        required: true
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        requried: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<IQuestion>('questions', QuestionSchema);