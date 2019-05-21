import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesQCMDashboardComponent } from './notes-qcmdashboard.component';

describe('NotesQCMDashboardComponent', () => {
  let component: NotesQCMDashboardComponent;
  let fixture: ComponentFixture<NotesQCMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesQCMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesQCMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
