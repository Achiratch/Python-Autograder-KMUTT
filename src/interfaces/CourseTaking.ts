import { Document, ObjectId } from 'mongoose'


export default interface ICourseTaking extends Document {
    course: ObjectId;
    user: ObjectId;
    status: boolean;
    dateCreate: Date;
}