import mongoose from "mongoose";
import { Request, Response } from "express";
import { User } from "../Models/User";
export class FormController {

    public async postInscription(req: Request, res: Response) {
        try {
            const user = {
                motdepasse : 'test',
                mail : 'test',
                prenom : 'test',
                nom : 'test',
                role : 'eleve'
            }
            // const user: IUserInterface = req.body;
            const currentUserToInsert = new User(user);
            const result = await currentUserToInsert.save();
            if(result) {
                res.status(200).send(result);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

}

