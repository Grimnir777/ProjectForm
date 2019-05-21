import { FormController } from "../Controllers/formController";
export class FormRoute {
    public formAPIController: FormController = new FormController();
    public routes(app): void {
        app.route('/formAPI/postInscription').post(this.formAPIController.postInscription);
    }
}