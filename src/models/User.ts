import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    studentId: {
        type: Number,
        required: true

    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        requried: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('users', UserSchema);