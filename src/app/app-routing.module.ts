import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectComponent } from './projects/project/project.component';
import { LoginComponent } from './login/login.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from './login/authguard.service';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent, canActivate: [AuthguardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthguardService]},
  {path: 'projects', component: ProjectsComponent,  canActivate: [AuthguardService], children: [
    {path: 'add', component: AddProjectComponent},
    {path: 'edit', component : EditProjectComponent},
    {path: 'detail', component: ProjectComponent},
  ]},
  {path: 'lessons', canActivate: [AuthguardService], component: LessonsComponent},
  {path: 'reports',canActivate: [AuthguardService],  component: ReportsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


