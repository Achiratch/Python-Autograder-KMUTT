import mongoose from "mongoose";
import ICourseTaking from '../interfaces/CourseTaking'
const Schema = mongoose.Schema;

//Create Schema
const CourseTakingSchema = new Schema({
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
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<ICourseTaking>('courseTakings', CourseTakingSchema);