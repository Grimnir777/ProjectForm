import { IChoix } from './Choix';

export interface IQuestion {
    _id : string;
    nbReponseValidQuestion : number; //{Default value = 1, mais si choix multiple, on peut custom}
    pointQuestion : number;//{Default value = 1, on peut adapter}
    listChoix: Array<IChoix>; //(la liste des choix associé aux questions sont stocké dans cet array)
    enonce: String;
}