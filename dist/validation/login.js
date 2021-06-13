"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("./is-empty"));
let validateLoginInput;
exports.default = validateLoginInput = (data) => {
    let errors = {};
    data.studentID = !is_empty_1.default(data.studentID) ? data.studentID : '';
    data.password = !is_empty_1.default(data.password) ? data.password : '';
    if (validator_1.default.isEmpty(data.studentID)) {
        errors.studentID = 'Student ID field is required';
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
};
