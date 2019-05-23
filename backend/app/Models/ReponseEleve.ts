import mongoose, { Model } from "mongoose";
import { QuestionSchema } from "./Question";
import { IReponseEleve } from "../Interfaces/ReponseEleve";
const Schema = mongoose.Schema;
var Question = QuestionSchema;

export const ReponseEleveSchema = new Schema({
    nomQCM: { type: String, required: true },
    mail: { type: String, required: true },
    nbQuestionQCM: { type: Number, required: true },
    maxPointQCM: { type: Number, required: true },
    matiereQCM: { type: String, required: true },
    listQuestion: [Question],
    sessionID: { type: Number }
});

export let ReponseEleve: Model<IReponseEleve> = mongoose.model<IReponseEleve>("reponseEleve", ReponseEleveSchema, "ReponseEleve");