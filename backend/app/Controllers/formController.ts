import mongoose from "mongoose";
import { Request, Response } from "express";

export class FormController {

    public async getData(req: Request, res: Response) {
        try {
            res.status(200).send({message: "hey"});
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

}

