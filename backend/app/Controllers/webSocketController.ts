import mongoose from "mongoose";
import { Request, Response } from "express";
import * as socketio from "socket.io";

export class WebSocketController {
    public tunnel() {
        var socket = socketio('http://localhost');
        socket.on('connection', function(socket){
            console.log('a user connected');
        });
    }
}
