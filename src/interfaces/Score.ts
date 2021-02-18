import { Document, ObjectId } from 'mongoose'


export default interface IScore extends Document {
    course: ObjectId;
    student: ObjectId;
    assignment: ObjectId;
    sendingStatus: string;
    score: string;
    dateCreate: Date;

}