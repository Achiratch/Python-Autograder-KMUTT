import mongoose from "mongoose";
import ICourseTaking from '../interfaces/CourseTaking'
import User from "./User";
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
        requried: true
    },

});
//Create Schema
const CourseTakingSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true

    },
    student: StudentSchema,
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