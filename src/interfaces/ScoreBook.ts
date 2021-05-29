import { Document, ObjectId } from 'mongoose'
import { fileDesc } from './Question'
import IProfile from './Profile'

export default interface IScoreBook extends Document {
    course: ObjectId;
    student: IProfile;
    assignment: ObjectId;
    sendingStatus: string;
    score: number;
    sentDate: Date;

}