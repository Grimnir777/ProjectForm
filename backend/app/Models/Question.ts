import mongoose, { Model } from "mongoose";
import { ChoixSchema } from "./Choix";
import { IQuestion } from "../Interfaces/Question";
const Schema = mongoose.Schema;
var Choix = ChoixSchema;

export const QuestionSchema = new Schema ({
    nbReponseValidQuestion: { type: Number, required: true},
    pointQuestion: { type: Number, required: true},
    listChoix: [Choix],
    enonce: { type: String, required: true }
});

export let Question: Model<IQuestion> = mongoose.model<IQuestion>("question", QuestionSchema, "Question");