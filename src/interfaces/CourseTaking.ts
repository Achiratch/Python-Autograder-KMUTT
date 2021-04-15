import { Document, ObjectId, Schema } from 'mongoose'
import { IUser } from '../models/User';
import ICourse from './Course';


export default interface ICourseTaking extends Document {
    course: ICourse | ObjectId;
    student: Schema;
    status: boolean;
    dateCreate: Date;
}