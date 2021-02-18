import { Document, ObjectId } from 'mongoose'


export default interface IQuestion extends Document {
    assignment: ObjectId
    createBy: ObjectId;
    level: string;
    dateCreate: Date;
}