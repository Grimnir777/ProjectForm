import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { QCM } from 'src/app/Models/QCM';
import { notEqual } from 'assert';
import { Question } from 'src/app/Models/Question';

@Component({
  selector: 'app-notes-qcmdashboard',
  templateUrl: './notes-qcmdashboard.component.html',
  styleUrls: ['./notes-qcmdashboard.component.scss']
})
export class NotesQCMDashboardComponent implements OnInit {
  listMatieres : Array<string> = ["Maths", "Histoire", "Informatique"];
  listNotesMatieres= new Map<string, Array<number> >();
  listQCM: Array<QCM>;
  constructor(private userService: UserService, private qcmService: QCMService) { 
    this.qcmService.getQCMByUser(userService.currentUser.mail).subscribe(
      (listQCMFromAPI: Array<QCM>) => {
        this.listQCM = listQCMFromAPI;

        this.listNotesMatieres.set("Maths",[]);
        this.listNotesMatieres.set("Histoire",[]);
        this.listNotesMatieres.set("Informatique",[]);


        this.note();
        console.log('listQCMFrom API ', this.listQCM);
      }
    );
  }

  public note(){
    //this.listMatieres.forEach(matiere => {
      //let listNotes : Array<number> = [];
      this.listQCM.forEach(qcm => {
        let counterQuestionGood = 0;
        let Note=0;
        qcm.listQuestions.forEach(question => {
          let counterChoixGood = 0;
          question.listChoix.forEach(choix => {
            if (choix.isValid) {
              counterChoixGood++;
            }
            if (counterChoixGood === question.nbReponseValidQuestion &&
              question.listChoix.length === question.nbReponseValidQuestion) {
                counterQuestionGood++;
            }
          });
        })
        Note = (20/qcm.maxPointQCM) * counterQuestionGood;
        console.log("la note est: ", Note);
        this.listNotesMatieres.get(qcm.matiereQCM).push(Note);
        //this.listNotesMatieres.set(qcm.matiereQCM, listNotes);
        //  counter push dans array

      });
    //});
    

    

}
  ngOnInit() {
  }


}
