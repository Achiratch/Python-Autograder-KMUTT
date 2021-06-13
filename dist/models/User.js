"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Role_1 = __importDefault(require("./Role"));
const Schema = mongoose_1.default.Schema;
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
        default: Role_1.default.STUDENT,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const User = mongoose_1.default.model('users', UserSchema);
exports.default = User;
