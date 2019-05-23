import { QCMController } from '../Controllers/QCMController'
export class QCMRoute {
    public qcmController: QCMController = new QCMController();
    public routes(app): void {
        app.route('/qcmAPI/getQCMSOpenened').get(this.qcmController.getQCMSOpenened);
        app.route('/qcmAPI/postQCM').post(this.qcmController.postQCM);
        app.route('/qcmAPI/postAnswerQCM').post(this.qcmController.postAnswerQCM);
    }
}