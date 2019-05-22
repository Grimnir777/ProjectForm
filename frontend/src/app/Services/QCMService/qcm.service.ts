import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QCM } from 'src/app/Models/QCM';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QCMService {

  private _getQCMSOpenedUrl = environment.qcmAPI + 'getQCMSOpenened';

  public currentQCMS : Array<QCM> = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  public getQCMSOpened() {
    return new Observable ((suscriber) => {
      this.http.get(this._getQCMSOpenedUrl).subscribe((qcmsFromAPI: Array<any>) => {
        this.currentQCMS = [];
        for(let i = 0; i < qcmsFromAPI.length; i++) {
          this.currentQCMS.push(new QCM(qcmsFromAPI[i]));
          console.log(this.currentQCMS[i]);
        }
        suscriber.next(this.currentQCMS)
     },
     (err) => {
       console.log(err);
     })
    });
  }
}
