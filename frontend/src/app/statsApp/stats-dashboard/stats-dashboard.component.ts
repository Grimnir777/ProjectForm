import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { UserService } from 'src/app/Services/UserService/user.service';
import { QCMService } from 'src/app/Services/QCMService/qcm.service';
import { ReponseEleve } from 'src/app/Models/ReponseEleve';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  public lineChartData: ChartDataSets[];
  listNotesMatieres= new Map<string, Array<number> >();
  listQCM: Array<ReponseEleve>;
  loaded = false;
  public lineChartLabels: Label[] = ['QCM 1', 'QCM 2', 'QCM 3', 'QCM 4', 'QCM 5'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  constructor(private userService: UserService, private qcmService: QCMService) { 
    this.qcmService.getQCMByUser(userService.currentUser.mail).subscribe(
      (listQCMFromAPI: Array<ReponseEleve>) => {
        this.listQCM = listQCMFromAPI;
        this.listNotesMatieres.set('Maths',[]);
        this.listNotesMatieres.set('Histoire',[]);
        this.listNotesMatieres.set('Informatique',[]);
        this.note();
        this.lineChartData = [
          { data: this.listNotesMatieres.get('Maths'), label: 'Maths' },
          { data: this.listNotesMatieres.get('Histoire'), label: 'Histoire' },
          { data: this.listNotesMatieres.get('Informatique'), label: 'Informatique', yAxisID: 'y-axis-1' }
        ];
        this.loaded = true;
        console.log(' listNotesMatieres ', this.listNotesMatieres);
        
        console.log('listQCMFrom API ', this.listQCM);
      }
      
  );
  }

  ngOnInit() {
  }


  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  


  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public note(){
    //this.listMatieres.forEach(matiere => {
      //let listNotes : Array<number> = [];
      console.log(this.listQCM);
      this.listQCM.forEach(qcm => {
        let counterQuestionGood = 0;
        let Note=0;
        qcm.listQuestion.forEach(question => {
          let counterChoixGood = 0;
          question.listChoix.forEach(choix => {
            if (choix.isValid) {
              counterChoixGood++;
            }
            if (counterChoixGood === question.nbReponseValidQuestion &&
              question.listChoix.length === question.nbReponseValidQuestion) {
                counterQuestionGood++;
            }
          });
        })
        Note = (20/qcm.maxPointQCM) * counterQuestionGood;
        console.log('la note est: ', Note);
        console.log('ta liste est : ', this.listNotesMatieres);
        console.log('ton qcm matiere est ', qcm.matiereQCM);
        console.log('la liste est: ' ,this.listNotesMatieres.get(qcm.matiereQCM));
        this.listNotesMatieres.get(qcm.matiereQCM).push(Note);
        //this.listNotesMatieres.set(qcm.matiereQCM, listNotes);
        //  counter push dans array

      });
    //});
    

    

}
}
