import { Component, OnInit, OnDestroy } from '@angular/core';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { QCM } from 'src/app/Models/QCM';
import { WebSocketService } from '../../web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participation-qcmdashboard',
  templateUrl: './participation-qcmdashboard.component.html',
  styleUrls: ['./participation-qcmdashboard.component.scss']
})
export class ParticipationQCMDashboardComponent implements OnInit, OnDestroy {
  private qcmsOpened: any;
  public currentQCM: QCM;
  public isTeacher: boolean;
  public sessionOpened: boolean;
  public showPanel = true;

  constructor(private qcmService: QCMService, private wss: WebSocketService, private router: Router) {
    this.sessionOpened = false;
    this.qcmService.getQCMSOpened().subscribe((qcms) => {
      this.qcmsOpened = qcms;
    });
    this.wss.initiateConnection();
    this.wss.listen('connected').subscribe(() => {
      this.sessionOpened = true;
      console.log('connected to socket IO ! :D');
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // TODO déconnexion socket
    console.log('deconnexion du socket !');
  }

  selectQCM(selectedQCM) {
    this.showPanel = false;
    this.currentQCM = new QCM(selectedQCM);
  }

}
