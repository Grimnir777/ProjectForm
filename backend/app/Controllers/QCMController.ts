import { Request, Response } from "express";
import { QCM } from "../Models/QCM";
import { IQCM } from "../Interfaces/QCM";

export class QCMController {
    public async getQCMSOpenened(req: Request, res: Response) {
        try {
            let qcms = await QCM.find({'ouvert':true});
            console.log(qcms)
            if (qcms) {
                res.status(200).send(qcms);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }
}