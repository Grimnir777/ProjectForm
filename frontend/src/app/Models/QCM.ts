import { Question } from './Question';

export class QCM {
    _id: string;
    nomQCM: string;
    matiereQCM: string;
    createurQCM: string;
    ouvert: boolean;
    nbQuestionQCM: number;
    maxPointQCM: number;
    listQuestions: Array<Question>;

    constructor(QCM?: any) {
        if (this.matiereQCM) {
            this._id = QCM._id;
            this.nomQCM = QCM.nomQCM;
            this.matiereQCM = QCM.matiereQCM;
            this.createurQCM = QCM.createurQCM;
            this.ouvert = QCM.ouvert;
            this.nbQuestionQCM = QCM.nbQuestionQCM;
            this.maxPointQCM = QCM.maxPointQCM;
            this.listQuestions = QCM.listQuestions;
        }
    }
}