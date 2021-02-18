import { Document, ObjectId } from 'mongoose'


export default interface IAssignment extends Document {
    course: ObjectId;
    createBy: ObjectId;
    dateCreate: Date;
    dueDate: Date;
    totalScore: Number;
    level: string;
    type: string;
}