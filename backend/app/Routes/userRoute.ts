import { UserController } from "../Controllers/userController";
export class UserRoute {
    public userAPIController: UserController = new UserController();
    public routes(app): void {
        app.route('/userAPI/postInscription').post(this.userAPIController.postInscription);
        app.route('/userAPI/postConnexion').post(this.userAPIController.postConnexion);
    }
}