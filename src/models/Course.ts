import mongoose from "mongoose";
import ICourse from '../interfaces/Course'
const Schema = mongoose.Schema;

//Create Schema
const CourseSchema = new Schema({
    courseID: {
        type: String,
        required: true

    },
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        requried: true
    },
    academicYear: {
        type: Number,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});

export default mongoose.model<ICourse>('courses', CourseSchema);