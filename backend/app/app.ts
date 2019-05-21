import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import { FormRoute } from "./Routes/formRoute";
class App {

    public app: express.Application;
    public formRoute: FormRoute = new FormRoute();
    public db = "mongodb://localhost:27017/projectForm";
    constructor() {
        this.app = express();
        this.config();
        this.formRoute.routes(this.app);
    }

    private config(): void {
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