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

  constructor(qcm?: any) {
    if (qcm) {
      this._id = qcm._id;
      this.nomQCM = qcm.nomQCM;
      this.matiereQCM = qcm.matiereQCM;
      this.createurQCM = qcm.createurQCM;
      this.ouvert = qcm.ouvert;
      this.nbQuestionQCM = qcm.nbQuestionQCM;
      this.maxPointQCM = qcm.maxPointQCM;
      this.listQuestions = qcm.listQuestions;
    } else {
      this.listQuestions = [];
    }
  }

}
