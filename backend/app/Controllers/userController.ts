import { Request, Response } from "express";
import { User } from "../Models/User";
import { IUser } from "../Interfaces/User";
export class UserController {
    public async postInscription(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const currentUserToInsert = new User(user);
            let userSaved = await currentUserToInsert.save();
            if (userSaved) {
                userSaved = userSaved.toObject();
                delete userSaved['motdepasse'];
                res.status(200).send(userSaved);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async postConnexion(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            let userFind = await User.findOne({'mail':user.mail, 'motdepasse': user.motdepasse});
            if (userFind) {
                userFind = userFind.toObject();
                delete userFind['motdepasse'];
                res.status(200).send(userFind);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }
}