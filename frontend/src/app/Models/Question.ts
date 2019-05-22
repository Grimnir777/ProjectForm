import { Choix } from './Choix';

export class Question {
  _id: string;
  nbReponseValidQuestion: number;
  enonce: string;
  pointQuestion: number;
  listChoix: Array<Choix> = [];

  constructor(item?: any) {
    this.enonce = item.enonce;
    this.nbReponseValidQuestion = 0;
    if (item.isValid1) {
      this.nbReponseValidQuestion++;
    }
    if (item.isValid2) {
      this.nbReponseValidQuestion++;
    }
    this.pointQuestion = 1;
    const choix1 = new Choix(); // init values
    choix1.texteChoix = item.choix1;
    choix1.isValid = item.isValid1;
    const choix2 = new Choix(); // init values
    choix2.texteChoix = item.choix2;
    choix2.isValid = item.isValid2;
    this.listChoix.push(choix1);
    this.listChoix.push(choix2);
  }

}
