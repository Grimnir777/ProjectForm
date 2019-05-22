import mongoose, { Model} from "mongoose";
import { QuestionSchema } from "./Question";
import { IQCM } from "Interfaces/QCM";

const Schema = mongoose.Schema;
var Question = QuestionSchema;


export const QCMSchema = new Schema ({
    nomQCM: String,
    matiereQCM: String,
    createurQCM: String,
    nbQuestionQCM: Number,
    maxPointQCM: Number,
    ouvert: Boolean,
    listQuestions: [Question]
});

export let QCM: Model<IQCM> = mongoose.model<IQCM>("qcm", QCMSchema, "QCM");