import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService/user.service';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';

@Component({
  selector: 'app-notes-qcmdashboard',
  templateUrl: './notes-qcmdashboard.component.html',
  styleUrls: ['./notes-qcmdashboard.component.scss']
})
export class NotesQCMDashboardComponent implements OnInit {

  listQCM: any;
  constructor(private userService: UserService, private qcmService: QCMService) { 
    this.qcmService.getQCMByUser(userService.currentUser.mail).subscribe(
      (listQCMFromAPI) => {
        this.listQCM = listQCMFromAPI;
        console.log('listQCMFrom API ', this.listQCM);
      }
    );
  }

  ngOnInit() {
  }

}
