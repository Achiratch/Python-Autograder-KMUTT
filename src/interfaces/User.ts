import { Document } from 'mongoose'

export default interface IUser extends Document {
    studentId: number;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    date: Date;
}