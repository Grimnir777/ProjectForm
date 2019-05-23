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
  private _updateAnswerQCMUrl = environment.qcmAPI + 'updateAnswerQCM';
  private _shutDownQCMUrl = environment.qcmAPI + 'shutDownQCM';
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
        console.log('hey it works');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateAnswer(nomQCM, mail, currentQuestion) {
    const obj = {
      nomQCM: nomQCM,
      mail: mail,
      currentQuestion: currentQuestion
    };
    return this.http.post(this._updateAnswerQCMUrl, obj).subscribe(
      (result) => {
        console.log('hey it works');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  shutDownQCM(nomQCM) {
    return this.http.post(this._shutDownQCMUrl, {nomQCM}).subscribe(
      (result) => {
        console.log('hey it works');
      }
    );
  }
}
