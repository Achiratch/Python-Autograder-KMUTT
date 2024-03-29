import mongoose from "mongoose";
import ICourseTaking from '../interfaces/CourseTaking'
import IProfile from "../interfaces/Profile";
import User from "./User";
const Schema = mongoose.Schema;

const StudentSchema = new Schema<IProfile>({
    studentID: {
        type: String,
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