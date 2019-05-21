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
  NBStudentsOnline: any;
  actualSession: number;
  sessionType: string;

  constructor(private userService: UserService, private http: HttpClient, private webSocketService: WebSocketService) {
    if (this.userService.loggedIn()) { // source page, reload on refresh.
      this.userService.initUser();
    }
    this.sessionType = 'Pas de session en cours';
    /*
    this.http.get('http://localhost:3000/formAPI/getData').subscribe(
      (result) => {
        console.log(result);
      }
    );*/
  }
  openModule(module: number) {
    this.webSocketService.initiateConnection();
    this.webSocketService.openModule(module);
    this.sessionType = 'Session prof';
    this.actualSession = module;
    this.NBStudentsOnline = 0;
    this.webSocketService.listen('NBStudentsOnline').subscribe((nbStudents) => {
      this.NBStudentsOnline = nbStudents;
    });
    this.webSocketService.listen('newResponse').subscribe((response) => {
      console.log(response);
    });
  }

  closeModule(module: number) {
    this.webSocketService.closeModule(module);
    this.webSocketService.removeListener('NBStudentsOnline');
    this.sessionType = 'Pas de session en cours';
    this.actualSession = undefined;
    this.NBStudentsOnline = undefined;
  }

  joinModule(module: number) {
    this.webSocketService.initiateConnection();
    this.webSocketService.joinModule(module);
    this.webSocketService.listen('NBStudentsOnline').subscribe((nbStudents) => {
      this.NBStudentsOnline = nbStudents;
    });

    this.webSocketService.listen('newQuestion').subscribe((question) => {
      console.log(question);
    });

    this.webSocketService.listen('printResponseQuestion').subscribe((responseQuestion) => {
      console.log(responseQuestion);
    });
    this.sessionType = 'Session etudiant';
    this.actualSession = module;
  }
  quitModule(module: number) {
    this.webSocketService.quitModule(module);
    this.webSocketService.removeListener('NBStudentsOnline');
    this.sessionType = 'Pas de session en cours';
    this.NBStudentsOnline = undefined;
    this.actualSession = undefined;
  }

  // TOCHANGE --> TEST
  sendNewQuestion() {
    const newQuestion = {
      nbReponseValidQuestion: 1,
      pointQuestion: 1,
      enonce: 'Capitale de la France ?',
      listChoix: [
        {
          texteChoix: 'Paris',
          isValid: true
        },
        {
          texteChoix: 'Barcelone',
          isValid: false
        },
        {
          texteChoix: 'Madrid',
          isValid: false
        },
        {
          texteChoix: 'Londres',
          isValid: false
        }
      ]
    };
    this.webSocketService.sendNewQuestion(newQuestion);
  }

  // TOCHANGE --> TEST
  sendNewResponse() {
    const newResponse = {
      nbReponseValidQuestion: 1,
      pointQuestion: 0,
      enonce: 'Capitale de la France ?',
      listChoix: [
        {
          texteChoix: 'Paris',
          isValid: false
        },
        {
          texteChoix: 'Barcelone',
          isValid: true
        },
        {
          texteChoix: 'Madrid',
          isValid: false
        },
        {
          texteChoix: 'Londres',
          isValid: false
        }
      ]
    };
    this.webSocketService.sendNewResponse(newResponse);
  }

  // TOCHANGE --> TEST
  printResponseQuestion(questionID: number) {
    this.webSocketService.printResponseQuestion(questionID);
  }
}
