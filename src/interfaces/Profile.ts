import { Document } from 'mongoose'


export default interface IProfile extends Document {
    _id: string;
    studentID: string;
    email: string;
    firstName: string;
    lastName: string;
}