import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { WebSocketService } from '../app/web-socket.service';
import { SessionComponent } from './session/session.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './Services/UserService/user.service';
import { CreerQCMDashboardComponent } from './CreationQCMApp/creer-qcmdashboard/creer-qcmdashboard.component';
import { NotesQCMDashboardComponent } from './notesQCMApp/notes-qcmdashboard/notes-qcmdashboard.component';
import { StatsDashboardComponent } from './statsApp/stats-dashboard/stats-dashboard.component';
import { ParticipationQCMDashboardComponent } from './participationQCMApp/participation-qcmdashboard/participation-qcmdashboard.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SessionComponent,
    DashboardComponent,
    CreerQCMDashboardComponent,
    NotesQCMDashboardComponent,
    StatsDashboardComponent,
    ParticipationQCMDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    WebSocketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
