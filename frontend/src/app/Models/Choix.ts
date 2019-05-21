
export class Choix {
    _id: string;
    texteChoix: string;
    isValid: boolean;

    constructor(Choix?: any) {
        if (Choix) {
            this._id = Choix._id;
            this.texteChoix = Choix.texteChoix;
            this.isValid = Choix.isValid;
        }
    }
}