import { Document, ObjectId } from 'mongoose'
import { fileDesc } from './Question'

export default interface IScoreBook extends Document {
    course: ObjectId;
    student: ObjectId;
    assignment: ObjectId;
    sendingStatus: string;
    score: number;
    sentDate: Date;

}