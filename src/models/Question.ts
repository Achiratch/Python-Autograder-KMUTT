import mongoose from "mongoose";
import IProfile from "../interfaces/Profile";
import IQuestion from '../interfaces/Question'
const Schema = mongoose.Schema;


const TeacherSchema = new Schema<IProfile>({
    studentID: {
        type: Number,
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
        required: true
    },
})

//Create Schema
const QuestionSchema = new Schema<IQuestion>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sct: {
        filename: {
            type: String,
            required: true
        },
        filepath: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },
    solution: {
        filename: {
            type: String,
            required: true
        },
        filepath: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        }
    },
    sample: {
        filename: {
            type: String,
        },
        filepath: {
            type: String,
        },
        code: {
            type: String,
        }
    },
    preExercise: {
        filename: {
            type: String,
        },
        filepath: {
            type: String,
        },
        code: {
            type: String,
        }
    },
    createBy: TeacherSchema,
    level: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },

});





export default mongoose.model<IQuestion>('questions', QuestionSchema);