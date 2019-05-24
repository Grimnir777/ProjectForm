import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { ReponseEleve } from 'src/app/Models/ReponseEleve';

@Component({
  selector: 'app-notes-qcmdashboard',
  templateUrl: './notes-qcmdashboard.component.html',
  styleUrls: ['./notes-qcmdashboard.component.scss']
})
export class NotesQCMDashboardComponent implements OnInit {
  listNotesMatieres= new Map<string, Array<number> >();
  listQCM: Array<ReponseEleve>;
  constructor(private userService: UserService, private qcmService: QCMService) { 
    this.qcmService.getQCMByUser(userService.currentUser.mail).subscribe(
      (listQCMFromAPI: Array<ReponseEleve>) => {
        this.listQCM = listQCMFromAPI;
        this.listNotesMatieres.set('Maths',[]);
        this.listNotesMatieres.set('Histoire',[]);
        this.listNotesMatieres.set('Informatique',[]);
        this.note();
        console.log(' listNotesMatieres ', this.listNotesMatieres);
        
        console.log('listQCMFrom API ', this.listQCM);
      }
      
  );
  }

  public note(){
    //this.listMatieres.forEach(matiere => {
      //let listNotes : Array<number> = [];
      console.log(this.listQCM);
      this.listQCM.forEach(qcm => {
        let counterQuestionGood = 0;
        let Note=0;
        qcm.listQuestion.forEach(question => {
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
        console.log('la note est: ', Note);
        console.log('ta liste est : ', this.listNotesMatieres);
        console.log('ton qcm matiere est ', qcm.matiereQCM);
        console.log('la liste est: ' ,this.listNotesMatieres.get(qcm.matiereQCM));
        this.listNotesMatieres.get(qcm.matiereQCM).push(Note);
        //this.listNotesMatieres.set(qcm.matiereQCM, listNotes);
        //  counter push dans array

      });
    //});
    

    

}
  ngOnInit() {
  }


}
