import { QCMController } from '../Controllers/QCMController'
export class QCMRoute {
    public qcmController: QCMController = new QCMController();
    public routes(app): void {
        app.route('/qcmAPI/getQCMS').post(this.qcmController.getQCMS);
        app.route('/qcmAPI/postQCM').post(this.qcmController.postQCM);
        app.route('/qcmAPI/postAnswerQCM').post(this.qcmController.postAnswerQCM);
        app.route('/qcmAPI/updateAnswerQCM').post(this.qcmController.updateAnswerQCM);
        app.route('/qcmAPI/openQCM').post(this.qcmController.openQCM);
        app.route('/qcmAPI/shutDownQCM').post(this.qcmController.shutDownQCM);
        app.route('/qcmAPI/getQCMByUser').post(this.qcmController.getQCMByUser);

    }
}