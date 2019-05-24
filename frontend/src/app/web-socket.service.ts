import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from './Models/User';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  readonly uri: string = 'http://18.184.154.240:3000/QCMs';

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

  removeAllListenerTeacher(){
    this.socket.removeAllListeners('NBStudentsOnline');
    this.socket.removeAllListeners('newResponse');
    this.socket.removeAllListeners('userConnected');
    this.socket.removeAllListeners('userDeconnected');
  }

  removeAllListenerStudent(){
    this.socket.removeAllListeners('NBStudentsOnline');
    this.socket.removeAllListeners('startSession');
    this.socket.removeAllListeners('stopSession');
    this.socket.removeAllListeners('newQuestion');
    this.socket.removeAllListeners('printResponseQuestion');
    this.socket.removeAllListeners('userConnected');
    this.socket.removeAllListeners('userDeconnected');
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

  sendNewQuestion(moduleID : string, newQuestion) {
    this.socket.emit('newQuestion',moduleID, newQuestion );
  }

  printResponseQuestion(module) {
    this.socket.emit('printResponseQuestion',module);
  }

  sendNewResponse(newResponse,moduleID, questionPos) {
    this.socket.emit('newResponse', newResponse,moduleID, questionPos);
  }

}
