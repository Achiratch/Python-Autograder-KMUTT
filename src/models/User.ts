import mongoose from "mongoose";
import ROLE from './Role'
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
    studentID: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    date: Date;
}

//Create Schema
const UserSchema = new Schema({
    studentID: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        requried: true
    },
    role: {
        type: String,
        default: ROLE.STUDENT,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model<IUser>('users', UserSchema)
export default User
