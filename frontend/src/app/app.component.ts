import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/formAPI/getData').subscribe(
      (result) => {
        console.log(result);
      }
    );
  }
}
