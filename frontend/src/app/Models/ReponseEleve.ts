import { Question } from './Question';

export class ReponseEleve {
  _id: string;
  ReponseEleve: string;
  nbQuestionQCM: number;
  maxPoint: number;
  listQuestion: Array<Question>;

  constructor(reponseEleve?: any) {
    if (ReponseEleve) {
      this._id = reponseEleve._id;
      this.ReponseEleve = reponseEleve.ReponseEleve;
      this.nbQuestionQCM = reponseEleve.nbQuestionQCM;
      this.maxPoint = reponseEleve.maxPoint;
      this.listQuestion = reponseEleve.listQuestion;
    }
  }
}
