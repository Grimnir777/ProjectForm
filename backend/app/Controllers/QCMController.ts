import { Request, Response } from "express";
import { QCM } from "../Models/QCM";
import { IQCM } from "../Interfaces/QCM";
import { IReponseEleve } from "Interfaces/ReponseEleve";
import { ReponseEleve } from "../Models/ReponseEleve";

export class QCMController {
    public async getQCMS(req: Request, res: Response) {
        try {
            let qcms;
            if(req.body.role === 'eleve'){
                qcms = await QCM.find({ 'ouvert': true });
            }
            else{
                qcms = await QCM.find({});
            }
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

    public async postQCM(req: Request, res: Response) {
        try {
            const qcm: IQCM = req.body;
            const currentQcmToInsert = new QCM(qcm);
            let qcmSaved = await currentQcmToInsert.save();
            if (qcmSaved) {
                res.status(200).send(qcmSaved);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async postAnswerQCM(req: Request, res: Response) {
        try {
            const reponseEleve: IReponseEleve = req.body;
            const qcmExist = await ReponseEleve.findOne({'mail': reponseEleve.mail, 'nomQCM': reponseEleve.nomQCM});
            if (qcmExist) {
                reponseEleve.sessionID = qcmExist.sessionID + 1;
            } else {
                reponseEleve.sessionID = 0;
            }
            const currentReponseEleveToInsert = new ReponseEleve(reponseEleve);
            let currentReponseSaved = await currentReponseEleveToInsert.save();
            if (currentReponseSaved) {
                res.status(200).send(currentReponseSaved);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async updateAnswerQCM(req:Request, res: Response) {
        try {
            const resultUpdate = await ReponseEleve
                .findOneAndUpdate({'mail':req.body.mail, 'nomQCM': req.body.nomQCM, 'sessionID': req.body.sessionID }, 
                { $push: { listQuestion: req.body.currentQuestion  } });
            if (resultUpdate) {
                res.status(200).send(resultUpdate);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async openQCM(req:Request, res: Response) {
        console.log(req.body.nomQCM + ' opened')
        try {
            const resultUpdate = await QCM.updateOne({'nomQCM': req.body.nomQCM }, { $set: { 'ouvert': true } });
            if(resultUpdate) {
                res.status(200).send(resultUpdate);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async shutDownQCM(req:Request, res: Response) {
        try {
            // req.body = nomQCM
            const resultUpdate = await QCM.updateOne({'nomQCM': req.body.nomQCM }, { $set: { 'ouvert': false } });
            if(resultUpdate) {
                res.status(200).send(resultUpdate);
            }
            return;
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }

    public async getQCMByUser(req: Request, res: Response) {
        try {
            const listQCMFinded = await ReponseEleve.find({'mail': req.body.mail});
            if (listQCMFinded) {
                res.status(200).send(listQCMFinded);
            }
        }
        catch (err) {
            res.status(400).send(err);
            return;
        }
    }
}