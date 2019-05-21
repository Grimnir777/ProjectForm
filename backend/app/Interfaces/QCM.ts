import { IQuestion } from './Question';

export interface IQCM {
    _id : string;
    nomQCM : string;
    matiereQCM : string;
    createurQCM : string;
    ouvert : boolean;
    nbQuestionQCM : number;
    maxPointQCM : number;
    listQuestions: Array<IQuestion>;
}