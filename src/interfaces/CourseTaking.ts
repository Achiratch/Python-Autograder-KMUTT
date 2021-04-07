import { Document, ObjectId } from 'mongoose'
import { IUser } from '../models/User';
import ICourse from './Course';


export default interface ICourseTaking extends Document {
    course: ICourse | ObjectId;
    student: Document;
    status: boolean;
    dateCreate: Date;
}