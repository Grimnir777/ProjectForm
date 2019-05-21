import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerQCMDashboardComponent } from './creer-qcmdashboard.component';

describe('CreerQCMDashboardComponent', () => {
  let component: CreerQCMDashboardComponent;
  let fixture: ComponentFixture<CreerQCMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerQCMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerQCMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
