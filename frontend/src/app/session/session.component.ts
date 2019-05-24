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
  showResponse: boolean;
  waitingForResponse : boolean;
  sessionStarted: boolean;
  sessionStoped: boolean;
  actualQuestion: Question;
  sessionID = 0;
  testBool = true;
  cbResult1 = false;
  cbResult2 = false;
  cbResult3 = false;
  cbResult4 = false;
  questionPos = 0;
  currentListQuestion: Array<Question> = [];
  listAnswerEleve: Array<Array<any>> = [];
  prefixResponse : Array<string> = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  constructor(private router: Router, private us: UserService, private qcmService: QCMService) {
  }

  ngOnInit() {

    this.sessionStarted = false;
    this.sessionStoped = false;
    this.showResponse=false;
    this.isTeacher = this.us.getUserRole() === 'eleve' ? false : true;

    if (this.isTeacher) {
      this.NBStudentsOnline = 0;
      this.wss.openModule(this.actualQCM._id,this.us.currentUser);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents) => {
        this.NBStudentsOnline = nbStudents;
      });
      this.wss.listen('newResponse').subscribe((result: any) => {
        console.log('nouvelle reponse');
        console.log(this.listAnswerEleve)
        if (!this.listAnswerEleve[result.questionPos]) {
          console.log(this.questionPos)
          this.listAnswerEleve[result.questionPos] = [];
          console.log(this.listAnswerEleve)
        }
        let goodResponse = false;
        let counterGoodResponse = 0;
        const listChoix = result.response.listChoix;
        listChoix.forEach(choix => {
          if (choix.isValid) {
            counterGoodResponse++;
          }
        });
        if (counterGoodResponse === result.response.nbReponseValidQuestion &&
          listChoix.length === result.response.nbReponseValidQuestion) {
          goodResponse = true;
        }
        result.response['goodResponse'] = goodResponse;
        console.log(result.response);
        this.listAnswerEleve[result.questionPos].push(result.response);
        console.log(this.listAnswerEleve);
      });

      this.qcmService.openQCM(this.actualQCM.nomQCM);
    } else {
      this.wss.joinModule(this.actualQCM._id,this.us.currentUser);
      this.wss.listen('NBStudentsOnline').subscribe((nbStudents) => {
        this.NBStudentsOnline = nbStudents;
      });

      this.wss.listen('startSession').subscribe(() => {
        this.questionPos = 0;
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
            listQuestion: [this.currentQuestionFromUser()],
            matiereQCM: this.actualQCM.matiereQCM
          };
          this.qcmService.postAnswer(reponseEleve).subscribe(
            (reponseEleveToGetSessionID: any) => {
              this.sessionID = reponseEleveToGetSessionID.sessionID;
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.qcmService.updateAnswer(this.actualQCM.nomQCM, this.us.currentUser.mail, this.sessionID, this.currentQuestionFromUser());
        }
        console.log('session ended brutally bitch');
      });

      this.wss.listen('newQuestion').subscribe((question) => {
        console.log(question)
        if(question == null){
          this.router.navigate(['/dashboard']);
        }
        else{
          this.actualQuestion = new Question(question);
        }
        this.clearCheckbox();
        
        this.showResponse=false;
        //console.log('enter newquestion');
        //console.log(this.actualQuestion);
        // Envoyer l'info de leleve au prof avec newReponse ensuite !
        this.questionPos++;
      });

      this.wss.listen('printResponseQuestion').subscribe(() => {
        this.waitingForResponse = false;
        this.showResponse=true;
      });
    }
    this.wss.listen('userConnected').subscribe((studentName)=>{
      //alert('user connected : ' + studentName);
      this.notificationStudentCo(studentName);
     // document.getElementById('notificationBar').innerHTML += '<div>Nouvel utilisateur connecté : ' + studentName +'</div>'
      //console.log('user connected : ' + studentName);
    })

    this.wss.listen('userDeconnected').subscribe((studentName)=>{
      //alert('user deconnected : ' + studentName);
      this.notificationStudentDeco(studentName);
      //document.getElementById('notificationBar').innerHTML += '<div>Nouvel utilisateur déconnecté : ' + studentName +'</div>'
      //console.log('user deconnected : ' + studentName);
    })
  }

  ngOnDestroy() {
    if (this.isTeacher) {
      console.log('PROF : fermeture de la session');
      this.wss.removeAllListenerTeacher();
      this.wss.closeModule(this.actualQCM._id);
    } else {
      console.log('STUDENT : deconnexion de la session');
      this.wss.removeAllListenerStudent();      
      this.wss.quitModule(this.actualQCM._id,this.us.currentUser);
    }
  }

  startSession() {
    this.questionPos = 0;
    console.log('sending new question')
    console.log(this.actualQCM.listQuestions[this.questionPos])
    this.wss.sendNewQuestion(this.actualQCM._id , this.actualQCM.listQuestions[this.questionPos]);
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
    console.log('check at ',this.questionPos)
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
    if (this.cbResult1) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix1, isValid: isValid1 }));
    }
    if (this.cbResult2) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix2, isValid: isValid2 }));
    }
    if (this.cbResult3) {
      question.listChoix.push(new Choix({ texteChoix: texteChoix3, isValid: isValid3 }));
    }
    if (this.cbResult4) {
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
        listQuestion: [currentQuestion],
        matiereQCM: this.actualQCM.matiereQCM
      };
      this.qcmService.postAnswer(reponseEleve).subscribe(
        (reponseEleveToGetSessionID: any) => {
          this.sessionID = reponseEleveToGetSessionID.sessionID;
        },
        (err) => {
          console.log(err);
        }
      );
      const responseToSend = {
        listChoix: currentQuestion.listChoix,
        nomEleve: this.us.currentUser.nom,
        pointQuestion: currentQuestion.pointQuestion,
        nbReponseValidQuestion: this.actualQCM.listQuestions[this.questionPos].nbReponseValidQuestion
      };
      this.wss.sendNewResponse(responseToSend, this.actualQCM._id, this.questionPos);
    } else {
      this.qcmService.updateAnswer(this.actualQCM.nomQCM, this.us.currentUser.mail, this.sessionID, currentQuestion);
      currentQuestion['nomEleve'] = this.us.currentUser.nom;
      this.wss.sendNewResponse(currentQuestion, this.actualQCM._id, this.questionPos);
    }
    this.waitingForResponse = true;
  }

  newQuestion() {
    this.clearCheckbox();
    this.questionPos++;
    if (this.questionPos === this.actualQCM.nbQuestionQCM) {
      this.wss.sendNewQuestion(this.actualQCM._id ,null);
      //this.router.navigate(['/dashboard']);
    } else {
      this.wss.sendNewQuestion(this.actualQCM._id , this.actualQCM.listQuestions[this.questionPos]);
    }
    //console.log('enter new question: ', this.actualQCM.listQuestions[this.questionPos]);

  }

  showResponses(){
    this.wss.printResponseQuestion(this.actualQCM._id );
  }

  clearCheckbox() {
    this.cbResult1 = this.cbResult2 = this.cbResult3 = this.cbResult4 = false;
  }

  notificationStudentCo(studentName){
      document.getElementById('text').innerHTML='Nouvel étudiant connecté : ' + studentName;
      this.setAnimation();
      setTimeout(this.clearAnimation(), 3000);
  }
  notificationStudentDeco(studentName){
      document.getElementById('text').innerHTML='Nouvel étudiant déconnecté : ' + studentName;
      this.setAnimation();
      setTimeout(this.clearAnimation(), 3000);
  }

  setAnimation(){

    document.getElementById('notification').style.opacity = '1';
    document.getElementById('nbStudents').style.opacity = '0';

    document.getElementById('text').style.animation = "exit 3s ease-in-out ";
    document.getElementById('text').style.webkitAnimation = "exit 3s ease-in-out ";

    document.getElementById('notification').style.animation = "notify 3s ease-in-out";
    document.getElementById('notification').style.webkitAnimation = "notify 3s ease-in-out";

    document.getElementById('nbStudents').style.animation = "enter 3s ease-in-out";
    document.getElementById('nbStudents').style.webkitAnimation = "enter 3s ease-in-out ";
    
  }

  clearAnimation(){
    return function() {
      document.getElementById('text').style.animation = "";
      document.getElementById('text').style.webkitAnimation = "";

      document.getElementById('notification').style.opacity = '0';
      document.getElementById('nbStudents').style.opacity = '1';
    }
  }
}
