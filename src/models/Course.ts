import mongoose from "mongoose";
import ICourse from '../interfaces/Course'
const Schema = mongoose.Schema;

//Create Schema
const CourseSchema = new Schema<ICourse>({
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
        default: Date.now(),
        requried: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

CourseSchema.pre('save', function (next) {
    this.courseID = this.courseID.toUpperCase()

    next()
})

export default mongoose.model<ICourse>('courses', CourseSchema);