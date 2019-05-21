import { Choix } from './Choix';

export class Question {
    _id: string;
    nbReponseValidQuestion: number;
    enonce: string;
    pointQuestion: number;
    listChoix: Array<Choix>;

    constructor(Question?: any) {
        if (Question) {
            this._id = Question._id;
            this.nbReponseValidQuestion = Question.nbReponseValidQuestion;
            this.pointQuestion = Question.pointQuestion;
            this.listChoix = Question.listChoix;
            this.enonce = Question.enonce;
        }
    }
}