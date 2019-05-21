import { Component, OnInit, Input } from '@angular/core';
import { QCM } from '../Models/QCM';
import { Question } from '../Models/Question';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() qcmID:number;
  @Input() isTeacher:boolean;


  actualQCM : QCM;
  sessionOpened : boolean;
  NBStudentsOnline : any;

  constructor(private wss : WebSocketService) {
    this.sessionOpened = false;
    this.actualQCM = {
      _id: '1',
      nomQCM: 'Test QCM',
      matiereQCM: 'GEO',
      createurQCM: 'Dieu',
      ouvert: false,
      nbQuestionQCM: 2,
      maxPointQCM: 2,
      listQuestions: [
        new Question({
          nbReponseValidQuestion: 1,
          pointQuestion: 1,
          enonce: "Capitale de la France ?",
          listChoix: [
            {
              texteChoix: "Paris",
              isValid: true
            },
            {
              texteChoix: "Barcelone",
              isValid: false
            },
            {
              texteChoix: "Madrid",
              isValid: false
            },
            {
              texteChoix: "Londres",
              isValid: false
            }
          ]
        }),
        new Question({
          nbReponseValidQuestion: 1,
          pointQuestion: 1,
          enonce: "Capitale de l'Angleterre ?",
          listChoix: [
            {
              texteChoix: "Paris",
              isValid: false
            },
            {
              texteChoix: "Barcelone",
              isValid: false
            },
            {
              texteChoix: "Madrid",
              isValid: false
            },
            {
              texteChoix: "Londres",
              isValid: true
            }
          ]
        })
      ]
    }
    this.wss.initiateConnection();

  }

  ngOnInit() {
    console.log(this.qcmID)
    //GET QCM

    //start
    this.wss.initiateConnection();
    
    if(this.isTeacher){
      this.wss.openModule(this.qcmID);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents)=>{
        this.NBStudentsOnline= nbStudents;
      });
      this.wss.listen('newResponse').subscribe((response)=>{
        console.log(response);
      });
    }
    else{
      this.wss.joinModule(this.qcmID);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents)=>{
        this.NBStudentsOnline= nbStudents;
      });

      this.wss.listen('newQuestion').subscribe((question)=>{
        console.log(question);
      });

      this.wss.listen('printResponseQuestion').subscribe((responseQuestion)=>{
        console.log(responseQuestion);
      });
    }
  }

}
