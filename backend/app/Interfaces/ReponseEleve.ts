import { IQuestion } from './Question';

export interface IReponseEleve {
    _id : string;
    ReponseEleve: string;
    nbQuestionQCM : number;
    maxPoint : number;
    listQuestion: Array<IQuestion>;
}