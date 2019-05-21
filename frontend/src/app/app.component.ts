import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WebSocketService } from './web-socket.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  NBStudentsOnline: any;
  actualSession : number;

  constructor(private http: HttpClient,private webSocketService : WebSocketService) {
    //console.log('hello app');
    //this.webSocketService.emit('message','hello Web Socket');

    

    /*
    this.http.get('http://localhost:3000/formAPI/getData').subscribe(
      (result) => {
        console.log(result);
      }
    );*/
  }

  startSession(){
    this.webSocketService.initiateConnection();
    /*
    this.webSocketService.listen('message').subscribe((data)=>{
      console.log(data);
    });*/

    this.webSocketService.listen('NBStudentsOnline').subscribe((nbStudents)=>{
      this.NBStudentsOnline= nbStudents;
    });
  }
  openModule(module: number){
    this.webSocketService.initiateConnection();
    this.webSocketService.openModule(module);
  }

  joinModule(module: number){
    this.webSocketService.initiateConnection();
    this.webSocketService.joinModule(module);
    this.webSocketService.listen('NBStudentsOnline').subscribe((nbStudents)=>{
      this.NBStudentsOnline= nbStudents;
    });
  }
  quitModule(module: number){
    this.webSocketService.quitModule(module);
  }
}
