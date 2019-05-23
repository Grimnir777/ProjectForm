import { IQuestion } from './Question';

export interface IReponseEleve {
    _id : string;
    nomQCM: string;
    mail: string;
    nbQuestionQCM : number;
    maxPointQCM : number;
    listQuestion: Array<IQuestion>;
    sessionID: number;
    matiereQCM: string;
}