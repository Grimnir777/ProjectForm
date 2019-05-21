import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket :any;
  readonly uri : string = 'localhost:3000';


  constructor() {
    this.socket = io(this.uri);
  }

  listen(eventName : string ){
    return new Observable((suscriber)=>{
      this.socket.on(eventName,(data)=>{
        suscriber.next(data);
      })
    });
  };

  emit(eventName : string, data : any){
    this.socket.emit(eventName,data);
  };

 
}
