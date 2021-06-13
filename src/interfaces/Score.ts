import { Document, ObjectId } from 'mongoose'
import { fileDesc } from './Question'

export default interface IScore extends Document {
    course: ObjectId;
    student: ObjectId;
    assignment: ObjectId;
    question: ObjectId;
    sendingStatus: string;
    answer: fileDesc;
    score: string;
    sentDate: Date;

}