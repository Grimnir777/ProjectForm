import mongoose, { Model} from "mongoose";
import { QuestionSchema } from "./Question";
import { IQCM } from "Interfaces/QCM";

const Schema = mongoose.Schema;
var Question = QuestionSchema;


export const QCMSchema = new Schema ({
    nomQCM: { type: String, required: true},
    matiereQCM: { type: String, required: true},
    createurQCM: { type: String, required: true},
    nbQuestionQCM: { type: Number, required: true},
    maxPointQCM: { type: Number, required: true},
    ouvert: { type: Boolean, required: true},
    listQuestions: [Question]
});

export let QCM: Model<IQCM> = mongoose.model<IQCM>("qcm", QCMSchema, "QCM");