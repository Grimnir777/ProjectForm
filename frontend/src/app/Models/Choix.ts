
export class Choix {
  _id: string;
  texteChoix: string;
  isValid: boolean;
  constructor(choix?: any) {
    if (choix) {
      this._id = choix._id;
      this.texteChoix = choix.texteChoix;
      this.isValid = choix.isValid;
    }
  }
}
