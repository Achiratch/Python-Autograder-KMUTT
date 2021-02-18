import mongoose from "mongoose";
import ICourseTaking from '../interfaces/CourseTaking'
const Schema = mongoose.Schema;

//Create Schema
const CourseTakingSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<ICourseTaking>('courseTakings', CourseTakingSchema);