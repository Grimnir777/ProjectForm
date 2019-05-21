import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../Models/User';
import { SubSink } from 'subsink';
import { UserService } from '../Services/UserService/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connexion = true;
  user: User = new User();
  checkProfessor = false;
  subs = new SubSink();
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  changePanel() {
    this.connexion = !this.connexion;
  }

  onSubmitConnexion(connexionForm: NgForm) {
    if (connexionForm.valid) {
      this.userService.postConnexion(this.user); // Observable<User>
    }
  }
  onSubmitInscription(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      this.checkProfessor === true ?
        this.user.role = 'professeur' : this.user.role = 'eleve';
      this.userService.postInscription(this.user); // Observable<User>
    }
  }
}
