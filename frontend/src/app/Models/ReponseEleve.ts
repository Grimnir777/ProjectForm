import { Question } from './Question';

export class ReponseEleve {
    _id: string;
    ReponseEleve: string;
    nbQuestionQCM: number;
    maxPoint: number;
    listQuestion: Array<Question>;

    constructor(ReponseEleve?: any) {
        if (ReponseEleve) {
            this._id = ReponseEleve._id;
            this.ReponseEleve = ReponseEleve.ReponseEleve;
            this.nbQuestionQCM = ReponseEleve.nbQuestionQCM;
            this.maxPoint = ReponseEleve.maxPoint;
            this.listQuestion = ReponseEleve.listQuestion;
        }
    }
}