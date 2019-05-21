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
  socket : any;
  constructor(private http: HttpClient,private webSocketService : WebSocketService) {
    console.log('hello app');
    this.webSocketService.emit('message','hello Web Socket');
    this.webSocketService.listen('message').subscribe((data)=>{
      console.log(data);
    },
    (err) => {
      console.log(err);
    })

/*
    this.http.get('http://localhost:3000/formAPI/getData').subscribe(
      (result) => {
        console.log(result);
      }
    );*/
  }
}
