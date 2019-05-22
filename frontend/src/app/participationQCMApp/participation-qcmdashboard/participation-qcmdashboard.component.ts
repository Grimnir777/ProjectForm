import { Component, OnInit } from '@angular/core';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { QCM } from 'src/app/Models/QCM';

@Component({
  selector: 'app-participation-qcmdashboard',
  templateUrl: './participation-qcmdashboard.component.html',
  styleUrls: ['./participation-qcmdashboard.component.scss']
})
export class ParticipationQCMDashboardComponent implements OnInit {
  private qcmsOpened : any;
  constructor(private qcmService : QCMService) { }

  ngOnInit() {
    this.qcmService.getQCMSOpened().subscribe((qcms) => {
      this.qcmsOpened = qcms;
    })
  }

}
