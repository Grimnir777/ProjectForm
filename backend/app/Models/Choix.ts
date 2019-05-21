import mongoose, { Model} from "mongoose";
import { IChoix } from "Interfaces/Choix";
const Schema = mongoose.Schema;

export const ChoixSchema = new Schema ({
    texteChoix: { type: String, required: true},
    isValid: { type: Boolean, required: true}
});

export let QCM: Model<IChoix> = mongoose.model<IChoix>("choix", ChoixSchema, "Choix");