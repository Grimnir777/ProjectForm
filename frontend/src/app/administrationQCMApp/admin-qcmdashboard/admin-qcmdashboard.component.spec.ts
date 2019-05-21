import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQCMDashboardComponent } from './admin-qcmdashboard.component';

describe('AdminQCMDashboardComponent', () => {
  let component: AdminQCMDashboardComponent;
  let fixture: ComponentFixture<AdminQCMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQCMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQCMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
