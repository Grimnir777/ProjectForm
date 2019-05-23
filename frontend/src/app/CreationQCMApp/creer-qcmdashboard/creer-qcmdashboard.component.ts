import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Question } from 'src/app/Models/Question';
import { QCM } from 'src/app/Models/QCM';
import { UserService } from 'src/app/Services/UserService/user.service';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-qcmdashboard',
  templateUrl: './creer-qcmdashboard.component.html',
  styleUrls: ['./creer-qcmdashboard.component.scss']
})
export class CreerQCMDashboardComponent implements OnInit {

  constructor(private qcmService: QCMService, private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

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
      isValid2: false,
      choix3: '',
      isValid3: false,
      choix4: '',
      isValid4: false
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
    this.qcm.matiereQCM = formValue.matiereQCM;
    const itemsLength = formValue.items.length;
    this.qcm.nbQuestionQCM = itemsLength;
    this.qcm.maxPointQCM = itemsLength;
    this.qcm.createurQCM = this.userService.currentUser.nom;
    this.qcm.ouvert = false;
    for (let i = 0; i < itemsLength; i++) {
      this.convertItemToQuestion(formValue.items[i]);
    }
    this.postQCM();
  }

  // Fonction de conversion d'un item à une question
  public convertItemToQuestion(item: any) {
    const q = new Question(item);
    this.qcm.listQuestions.push(q);
  }
  public postQCM() {
    console.log(this.qcm);
    this.qcmService.postQCM(this.qcm).subscribe(
      (result) => {
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
