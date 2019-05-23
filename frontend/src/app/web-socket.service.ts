import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from './Models/User';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri: string = 'localhost:3000/QCMs';

  constructor() { }

  initiateConnection() {
    this.socket = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((suscriber) => {
      this.socket.on(eventName, (data) => {
        suscriber.next(data);
      });
    });
  }

  removeListener(eventName: string) {
    this.socket.removeAllListeners(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  openModule(moduleID: string , user : User) {
    this.socket.emit('openModule', moduleID , user);
  }

  closeModule(moduleID: string) {
    this.socket.emit('closeModule', moduleID);
  }

  joinModule(moduleID: string , user : User) {
    this.socket.emit('joinModule', moduleID,user);
  }

  quitModule(moduleID: string , user : User) {
    this.socket.emit('quitModule', moduleID , user);
  }

  startSession(moduleID: string) {
    this.socket.emit('startSession', moduleID);
  }

  stopSession(moduleID: string) {
    this.socket.emit('stopSession', moduleID);
  }

  sendNewQuestion(newQuestion) {
    this.socket.emit('newQuestion', newQuestion);
  }

  printResponseQuestion(questionID) {
    this.socket.emit('printResponseQuestion', questionID);
  }

  sendNewResponse(newResponse,moduleID, questionPos) {
    this.socket.emit('newResponse', newResponse,moduleID, questionPos);
  }

}
