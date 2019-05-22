import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import { FormRoute } from "./Routes/formRoute";
import { UserRoute } from "./Routes/userRoute";
import { QCMRoute } from './Routes/QCMRoute'

class App {

    public app: express.Application;
    public formRoute: FormRoute = new FormRoute();
    public userRoute: UserRoute = new UserRoute();
    public qcmRoute : QCMRoute = new QCMRoute();

    public db = "mongodb://localhost:27017/projectForm";
    constructor() {
        this.app = express();
        this.config();
        this.formRoute.routes(this.app);
        this.userRoute.routes(this.app);
        this.qcmRoute.routes(this.app);
    }

    private config(): void {
        this.app.use(cors({ credentials: true, origin: true }));
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
        this.app.use(express.static('upload'));
        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });
       this.dbConnection();
    }

    private dbConnection(): void {
        mongoose.connect(this.db, { useNewUrlParser: true }, err => {
            if (err) {
                console.error('Error!' + err);
            } else {
                console.log('Connected to Mongodb bruw');
            }
        });
        mongoose.set('useCreateIndex', true);
    }
}

export default new App().app;