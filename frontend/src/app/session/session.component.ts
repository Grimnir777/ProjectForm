import { Component, OnInit, Input } from '@angular/core';
import { QCM } from '../Models/QCM';
import { Question } from '../Models/Question';
import { WebSocketService } from '../web-socket.service';
import { UserService } from '../Services/UserService/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() actualQCM:QCM;
  @Input() wss : WebSocketService;

  NBStudentsOnline : any;
  isTeacher : boolean;
  sessionStarted : boolean;
  sessionStoped : boolean;
  actualQuestion : Question;

  constructor(private us : UserService) {
  }

  ngOnInit() {
    this.sessionStarted = false;
    this.sessionStoped = false;

    this.isTeacher = this.us.getUserRole() == 'eleve' ? false:true;
    
    if(this.isTeacher){
      this.wss.openModule(this.actualQCM._id);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents)=>{
        this.NBStudentsOnline= nbStudents;
      });
      this.wss.listen('newResponse').subscribe((response)=>{
        //TODO gestion réponse
        console.log('nouvelle reponse')
        console.log(response);
      });
    }
    else{
      this.wss.joinModule(this.actualQCM._id);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents)=>{
        this.NBStudentsOnline= nbStudents;
      });

      this.wss.listen('startSession').subscribe(()=>{
        this.sessionStarted = true;
        console.log("session started");
      });

      this.wss.listen('stopSession').subscribe(()=>{
        this.sessionStarted = false;
        this.sessionStoped = true;
        console.log("session started");
      });

      this.wss.listen('newQuestion').subscribe((question)=>{
        this.actualQuestion = new Question(question);

        console.log(this.actualQuestion);
      });

      this.wss.listen('printResponseQuestion').subscribe((responseQuestion)=>{
        console.log(responseQuestion);
      });
    }
  }

  ngOnDestroy(){
    if(this.isTeacher){
      console.log("PROF : fermeture de la session");
      this.wss.closeModule(this.actualQCM._id);
    }
    else{
      console.log("STUDENT : deconnexion de la session")
      this.wss.quitModule(this.actualQCM._id);
    }
  }

  startSession(){
    this.sessionStarted = true;
    this.wss.startSession(this.actualQCM._id)
  }

  stopSession(){
    this.sessionStarted = false;
    this.wss.stopSession(this.actualQCM._id)
  }

  onQuestionSent(question : NgForm){
    console.log(question);
  }

  newQuestion(){
    this.wss.sendNewQuestion(this.actualQCM.listQuestions[0]);
    this.actualQuestion = this.actualQCM.listQuestions[0];
  }

}
