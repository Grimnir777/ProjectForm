import { Question } from './Question';

export class ReponseEleve {
  _id: string;
  nomQCM: string;
  mail: string;
  nbQuestionQCM: number;
  matiereQCM: string;
  maxPointQCM: number;
  listQuestion: Array<Question>;

  constructor(reponseEleve?: any) {
    if (reponseEleve) {
      if (reponseEleve._id) {
        this._id = reponseEleve._id;
      }
      this.nomQCM = reponseEleve.nomQCM;
      this.mail = reponseEleve.mail;
      this.nbQuestionQCM = reponseEleve.nbQuestionQCM;
      this.maxPointQCM = reponseEleve.maxPointQCM;
      this.listQuestion = reponseEleve.listQuestion;
      this.matiereQCM = reponseEleve.matiereQCM;
    }
  }
}

