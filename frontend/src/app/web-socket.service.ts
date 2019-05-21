import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket :any;
  readonly uri : string = 'localhost:3000/QCMs';

  constructor() {}

  initiateConnection(){
    this.socket = io(this.uri);
  }

  listen(eventName : string ){
    return new Observable((suscriber)=>{
      this.socket.on(eventName,(data)=>{
        suscriber.next(data);
      })
    });
  };

  removeListener(eventName: string){
    this.socket.removeAllListeners(eventName);
  }

  emit(eventName : string, data : any){
    this.socket.emit(eventName,data);
  };
  openModule(moduleID: number){
    this.socket.emit("openModule",moduleID);
  }
  closeModule(moduleID: number){
    this.socket.emit("closeModule",moduleID);
  }
  joinModule(moduleID: number){
    this.socket.emit("joinModule",moduleID);
  }
  
  quitModule(moduleID: number){
    this.socket.emit("quitModule",moduleID);
  }

  sendNewQuestion(newQuestion){
    this.socket.emit("newQuestion",newQuestion);
  }

  printResponseQuestion(questionID){
    this.socket.emit("printResponseQuestion",questionID);
  }

  sendNewResponse(newResponse){
    this.socket.emit("newResponse",newResponse);
  }
 
}
