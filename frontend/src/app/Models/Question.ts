import { Choix } from './Choix';

export class Question {
  _id: string;
  nbReponseValidQuestion: number;
  enonce: string;
  pointQuestion: number;
  nomEleve: string;
  listChoix: Array<Choix> = [];

  constructor(item?: any) {
    if (item['enonce']) {
      this.enonce = item.enonce;
      this.nbReponseValidQuestion = 0;
      if (item.isValid1) {
        this.nbReponseValidQuestion++;
      }
      if (item.isValid2) {
        this.nbReponseValidQuestion++;
      }
      if (item.isValid3) {
        this.nbReponseValidQuestion++;
      }
      if (item.isValid4) {
        this.nbReponseValidQuestion++;
      }
      this.pointQuestion = 1;
      const choix1 = new Choix(); // init values
      const choix2 = new Choix(); // init values
      const choix3 = new Choix(); // init values
      const choix4 = new Choix(); // init values
      choix1.texteChoix = item.choix1;
      choix1.isValid = item.isValid1;
      choix2.texteChoix = item.choix2;
      choix2.isValid = item.isValid2;
      choix3.texteChoix = item.choix3;
      choix3.isValid = item.isValid3;
      choix4.texteChoix = item.choix4;
      choix4.isValid = item.isValid4;
      this.listChoix.push(choix1);
      this.listChoix.push(choix2);
      this.listChoix.push(choix3);
      this.listChoix.push(choix4);
    }
    if (item['_id']) {
      console.log('enter item id');
      this._id = item._id;
      this.nbReponseValidQuestion = item.nbReponseValidQuestion;
      this.enonce = item.enonce;
      this.pointQuestion = item.pointQuestion;
      this.listChoix = item.listChoix;
    }
  }
}
