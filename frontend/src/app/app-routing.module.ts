import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreerQCMDashboardComponent } from './CreationQCMApp/creer-qcmdashboard/creer-qcmdashboard.component';
import { NotesQCMDashboardComponent } from './notesQCMApp/notes-qcmdashboard/notes-qcmdashboard.component';
import { StatsDashboardComponent } from './statsApp/stats-dashboard/stats-dashboard.component';
import { ParticipationQCMDashboardComponent } from './participationQCMApp/participation-qcmdashboard/participation-qcmdashboard.component';

import { ConnectedGuard } from './Guard/connected.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ConnectedGuard] },
  { path: 'creerQCM', component: CreerQCMDashboardComponent, canActivate: [ConnectedGuard] },
  { path: 'notesElevesQCM', component: NotesQCMDashboardComponent, canActivate: [ConnectedGuard] },
  { path: 'stats', component: StatsDashboardComponent, canActivate: [ConnectedGuard] },
  { path: 'participerQCM', component: ParticipationQCMDashboardComponent, canActivate: [ConnectedGuard] },
  { path: 'mesNotes', component: NotesQCMDashboardComponent, canActivate: [ConnectedGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
