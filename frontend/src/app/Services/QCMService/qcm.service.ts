import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QCM } from 'src/app/Models/QCM';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReponseEleve } from 'src/app/Models/ReponseEleve';

@Injectable({
  providedIn: 'root'
})
export class QCMService {

  private _getQCMSOpenedUrl = environment.qcmAPI + 'getQCMSOpenened';
  private _postQCMUrl = environment.qcmAPI + 'postQCM';
  private _postAnswerQCMUrl = environment.qcmAPI + 'postAnswerQCM';
  public currentQCMS: Array<QCM>;

  constructor(private http: HttpClient, private router: Router) {
  }

  public getQCMSOpened() {
    return new Observable((suscriber) => {
      this.http.get(this._getQCMSOpenedUrl).subscribe((qcmsFromAPI: Array<any>) => {
        this.currentQCMS = [];
        for (let i = 0; i < qcmsFromAPI.length; i++) {
          this.currentQCMS.push(new QCM(qcmsFromAPI[i]));
          console.log(this.currentQCMS[i]);
        }
        suscriber.next(this.currentQCMS);
      },
        (err) => {
          console.log(err);
        });
    });
  }

  public postQCM(Qcm: QCM) {
    return this.http.post(this._postQCMUrl, Qcm);
  }

  postAnswer(reponseEleve: any) {
    return this.http.post(this._postAnswerQCMUrl, reponseEleve).subscribe(
      (result) => {
        // on success redirect to dashboard
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
