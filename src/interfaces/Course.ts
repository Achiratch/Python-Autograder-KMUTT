import { Document, ObjectId } from 'mongoose'


export default interface ICourse extends Document {
    courseID: string;
    courseName: string;
    courseDescription: string;
    semester: number;
    academicYear: number;
    dateCreate: Date;
}