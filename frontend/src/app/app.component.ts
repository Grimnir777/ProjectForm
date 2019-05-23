import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WebSocketService } from './web-socket.service';
import { UserService } from './Services/UserService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private userService: UserService, private http: HttpClient, private webSocketService: WebSocketService) {
    if (this.userService.loggedIn()) { // source page, reload on refresh.
      this.userService.initUser();
    }
  }
}
