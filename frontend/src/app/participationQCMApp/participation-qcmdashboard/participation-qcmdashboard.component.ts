import { Component, OnInit, OnDestroy } from '@angular/core';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { QCM } from 'src/app/Models/QCM';
import { WebSocketService } from '../../web-socket.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-participation-qcmdashboard',
  templateUrl: './participation-qcmdashboard.component.html',
  styleUrls: ['./participation-qcmdashboard.component.scss']
})
export class ParticipationQCMDashboardComponent implements OnInit, OnDestroy {
  private allQCMS: any;
  public currentQCM: QCM;
  public isTeacher: boolean;
  public showPanel = true;

  constructor(private qcmService: QCMService, private wss: WebSocketService, private router: Router, private us : UserService) {

    this.qcmService.getQCMS(this.us.currentUser).subscribe((qcms) => {
      this.allQCMS = qcms;
    });
    this.wss.initiateConnection();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectQCM(selectedQCM) {
    this.showPanel = false;
    this.currentQCM = new QCM(selectedQCM);
  }

}
