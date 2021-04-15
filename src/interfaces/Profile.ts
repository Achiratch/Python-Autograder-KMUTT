import { Document } from 'mongoose'


export default interface IProfile extends Document {
    studentID: number;
    email: string;
    firstName: string;
    lastName: string;
}