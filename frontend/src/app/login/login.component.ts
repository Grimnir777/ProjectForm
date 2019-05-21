import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connexion = true;
  user = {
    email:'',
    password:''
  }
  constructor() { }

  ngOnInit() {
  }

  changePanel() {
    this.connexion = !this.connexion;
  }

  onSubmitConnexion(connexionForm: NgForm) {
    console.log(connexionForm);
    console.log(this.user);
  }
}
