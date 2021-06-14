import { Document } from 'mongoose'


export default interface IProfile extends Document {
    studentID: string;
    email: string;
    firstName: string;
    lastName: string;
}