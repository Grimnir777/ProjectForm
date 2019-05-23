import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QCM } from '../Models/QCM';
import { Question } from '../Models/Question';
import { WebSocketService } from '../web-socket.service';
import { UserService } from '../Services/UserService/user.service';
import { NgForm } from '@angular/forms';
import { Choix } from '../Models/Choix';
import { QCMService } from '../Services/QCMService/qcm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {
  @Input() actualQCM: QCM;
  @Input() wss: WebSocketService;

  NBStudentsOnline: any;
  isTeacher: boolean;
  sessionStarted: boolean;
  sessionStoped: boolean;
  actualQuestion: Question;
  sessionID = 0;
  testBool = true;
  cb1Result = false;
  cb2Result = false;
  cb3Result = false;
  cb4Result = false;
  questionPos = 0;
  currentListQuestion: Array<Question> = [];
  listAnswerEleve: Array<Array<any>> = [];
  constructor(private router: Router, private us: UserService, private qcmService: QCMService) {
  }

  ngOnInit() {
    this.sessionStarted = false;
    this.sessionStoped = false;

    this.isTeacher = this.us.getUserRole() === 'eleve' ? false : true;

    if (this.isTeacher) {
      this.wss.openModule(this.actualQCM._id);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents) => {
        this.NBStudentsOnline = nbStudents;
      });
      this.wss.listen('newResponse').subscribe((result: any) => {
        console.log('nouvelle reponse');

        if(!this.listAnswerEleve[result.questionPos]) {
          this.listAnswerEleve[result.questionPos] = [];
        }
        console.log('before failure ',  result.response);

        let choix = result.response.listChoix;
        let goodResponse = true;
        if(this.actualQCM.listQuestions[result.questionPos].nbReponseValidQuestion === choix.length){
          choix.forEach(choix => {
            if(choix.isValid === false )
            {
              goodResponse = false;
            }
          });
        }

        result.response['goodResponse'] = goodResponse;
        
        console.log(result.response)
        this.listAnswerEleve[result.questionPos].push(result.response);
        console.log(this.listAnswerEleve);
      });

      this.qcmService.openQCM(this.actualQCM.nomQCM);
    } else {
      this.wss.joinModule(this.actualQCM._id);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents) => {
        this.NBStudentsOnline = nbStudents;
      });

      this.wss.listen('startSession').subscribe(() => {
        this.sessionStarted = true;
        console.log('session started');
      });

      this.wss.listen('stopSession').subscribe(() => {
        this.sessionStarted = false;
        this.sessionStoped = true;
        if (this.questionPos === 0) {
          const reponseEleve = {
            nomQCM: this.actualQCM.nomQCM,
            mail: this.us.currentUser.mail,
            nbQuestionQCM: this.actualQCM.nbQuestionQCM,
            maxPointQCM: this.actualQCM.maxPointQCM,
            listQuestion: [this.currentQuestionFromUser()]
          };
          this.qcmService.postAnswer(reponseEleve).subscribe(
            (reponseEleveToGetSessionID: any) => {
              this.sessionID = reponseEleveToGetSessionID.sessionID;
            },
            (err) =>{
              console.log(err);
            }
          );
        } else {
          this.qcmService.updateAnswer(this.actualQCM.nomQCM, this.us.currentUser.mail, this.sessionID, this.currentQuestionFromUser());
        }
        console.log('session ended brutally bitch');
      });

      this.wss.listen('newQuestion').subscribe((question) => {
        this.actualQuestion = new Question(question);
        console.log('enter newquestion');
        console.log(this.actualQuestion);
        // Envoyer l'info de leleve au prof avec newReponse ensuite !
      });

      this.wss.listen('printResponseQuestion').subscribe((responseQuestion) => {
        console.log(responseQuestion);
      });
    }
  }

  ngOnDestroy() {
    if (this.isTeacher) {
      console.log('PROF : fermeture de la session');
      this.wss.closeModule(this.actualQCM._id);
    } else {
      console.log('STUDENT : deconnexion de la session');
      this.wss.quitModule(this.actualQCM._id);
    }
  }

  startSession() {
    this.questionPos = 0;
    this.newQuestion();
    this.wss.startSession(this.actualQCM._id);
    this.sessionStarted = true;
  }

  stopSession() {
    this.questionPos = 0;
    this.sessionStarted = false;
    this.qcmService.shutDownQCM(this.actualQCM.nomQCM);
    this.wss.stopSession(this.actualQCM._id);
  }

  currentQuestionFromUser() {
    const question = Object.assign({}, this.actualQCM.listQuestions[this.questionPos]);
    const texteChoix1 = question.listChoix[0].texteChoix;
    const texteChoix2 = question.listChoix[1].texteChoix;
    const texteChoix3 = question.listChoix[2].texteChoix;
    const texteChoix4 = question.listChoix[3].texteChoix;
    const isValid1 = question.listChoix[0].isValid;
    const isValid2 = question.listChoix[1].isValid;
    const isValid3 = question.listChoix[2].isValid;
    const isValid4 = question.listChoix[3].isValid;
    question.listChoix = [];
    if (this.cb1Result) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix1, isValid: isValid1 }));
    }
    if (this.cb2Result) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix2, isValid: isValid2 }));
    }
    if (this.cb3Result) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix3, isValid: isValid3 }));
    }
    if (this.cb4Result) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix4, isValid: isValid4 }));
    }
    return question;
  }
  onQuestionSent() {
    const currentQuestion = this.currentQuestionFromUser();
    if (this.questionPos === 0) {
      const reponseEleve = {
        nomQCM: this.actualQCM.nomQCM,
        mail: this.us.currentUser.mail,
        nbQuestionQCM: this.actualQCM.nbQuestionQCM,
        maxPointQCM: this.actualQCM.maxPointQCM,
        listQuestion: [currentQuestion]
      };
      this.qcmService.postAnswer(reponseEleve).subscribe(
        (reponseEleveToGetSessionID: any) => {
          this.sessionID = reponseEleveToGetSessionID.sessionID;
        },
        (err) =>{
          console.log(err);
        }
      );
      const responseToSend = {
        listChoix: currentQuestion.listChoix,
        nomEleve: this.us.currentUser.nom,
        pointQuestion: currentQuestion.pointQuestion
      }
      this.wss.sendNewResponse(responseToSend,this.actualQCM._id, this.questionPos);
    } else {
      this.qcmService.updateAnswer(this.actualQCM.nomQCM, this.us.currentUser.mail, this.sessionID, currentQuestion);
      currentQuestion['nomEleve'] = this.us.currentUser.nom;
      this.wss.sendNewResponse(currentQuestion, this.actualQCM._id, this.questionPos);
    }

    this.questionPos++;
    if (this.questionPos === this.actualQCM.nbQuestionQCM) {
      this.router.navigate(['/dashboard']);
    } else {
      this.newQuestion();
    }
  }

  newQuestion() {
    this.clearCheckbox();
    console.log('enter new question: ', this.actualQCM.listQuestions[this.questionPos]);
    this.wss.sendNewQuestion(this.actualQCM.listQuestions[this.questionPos]);
    this.actualQuestion = this.actualQCM.listQuestions[this.questionPos];
  }

  clearCheckbox() {
    this.cb1Result = this.cb2Result = this.cb3Result = this.cb4Result = false;
  }
}
