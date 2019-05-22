import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Question } from 'src/app/Models/Question';
import { QCM } from 'src/app/Models/QCM';
import { UserService } from 'src/app/Services/UserService/user.service';

@Component({
  selector: 'app-creer-qcmdashboard',
  templateUrl: './creer-qcmdashboard.component.html',
  styleUrls: ['./creer-qcmdashboard.component.scss']
})
export class CreerQCMDashboardComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  public orderForm: FormGroup;
  public qcm = new QCM();

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      nomQCM: '',
      matiereQCM: '',
      createurQCM: '',
      ouvert: false,
      items: this.formBuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      enonce: '',
      choix1: '',
      isValid1: false,
      choix2: '',
      isValid2: false
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  createChoix(): FormGroup {
    return this.formBuilder.group({
      nom: '',
      isTrue: ''
    });
  }

  public OnSubmit(formValue: any) {
    this.qcm.nomQCM = formValue.nomQCM;
    this.qcm.nbQuestionQCM = formValue.items.length;
    this.qcm.maxPointQCM = formValue.items.length;
    this.qcm.createurQCM = this.userService.currentUser.nom;
    for (let i = 0; i < formValue.items.length; i++) {
      this.convertItemToQuestion(formValue.items[i]);
    }
  }

  // Fonction de conversion d'un item à une question
  public convertItemToQuestion(item: any) {
    const q = new Question(item);
    this.qcm.listQuestions.push(q);
  }
}
