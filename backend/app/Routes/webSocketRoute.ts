import { WebSocketController } from "../Controllers/webSocketController";
export class WebSocketRoute {
    public webSocketController: WebSocketController = new WebSocketController();
    public routes(app): void {
        app.route('/webSocketAPI/tunnel').get(this.webSocketController.tunnel);
    }
}