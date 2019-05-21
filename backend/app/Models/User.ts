import mongoose, { Model } from "mongoose";
import { IUser } from "../Interfaces/User";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    motdepasse: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    role: { type: String, required: true, enum: ['professeur', 'eleve'] }
});

export let User: Model<IUser> = mongoose.model<IUser>("user", UserSchema, "User");