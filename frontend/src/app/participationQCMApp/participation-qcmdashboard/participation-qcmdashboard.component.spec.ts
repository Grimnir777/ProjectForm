import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationQCMDashboardComponent } from './participation-qcmdashboard.component';

describe('ParticipationQCMDashboardComponent', () => {
  let component: ParticipationQCMDashboardComponent;
  let fixture: ComponentFixture<ParticipationQCMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipationQCMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationQCMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
