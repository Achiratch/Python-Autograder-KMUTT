import { Document, ObjectId } from 'mongoose'
import IProfile from './Profile';
export interface IQuestionDetail {
    _id: ObjectId;
    score: Number;
}

export default interface IAssignment extends Document {
    name: string;
    description: string;
    course: ObjectId;
    createdBy: IProfile;
    questions: IQuestionDetail[];
    dateCreate: Date;
    dueDate: Date;
    totalScore: Number;
    level: string;
    type: string;
}