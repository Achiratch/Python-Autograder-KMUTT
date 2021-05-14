import { Document, ObjectId } from 'mongoose'
export interface fileDesc {
    filename: string;
    filepath: string;
    code: string;

}

export default interface IQuestion extends Document {
    name: string,
    description: string,
    sct: fileDesc,
    sample: fileDesc,
    solution: fileDesc,
    preExercise: fileDesc,
    createdBy: Document;
    level: string;
    dateCreate: Date;
}