import { Document } from 'mongoose'


export default interface IUser extends Document {
    studentID: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    date: Date;
}