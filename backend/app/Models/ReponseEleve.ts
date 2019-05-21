import mongoose, { Model } from "mongoose";
import { QuestionSchema } from "./Question";
import { IReponseEleve } from "../Interfaces/ReponseEleve";
const Schema = mongoose.Schema;
var Question = QuestionSchema;

export const ReponseEleveSchema = new Schema ({
    ReponseEleve: { type: String, required: true},
    nbQuestionQCM: { type: Number, required: true},
    maxPoint: { type: Number, required: true},
    listQuestion: [Question]
});
