import mongoose from "mongoose";
import IUser from '../interfaces/User'
import ROLE from './Role'
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    studentID: {
        type: Number,
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

export default mongoose.model<IUser>('users', UserSchema);