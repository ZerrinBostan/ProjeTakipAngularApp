import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

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
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { AdminReportsComponent } from './admin/reports/admin-reports.component';
import { NotesComponent } from './admin/notes/notes.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: '', component: HomeComponent, canActivate: [AuthguardService], children: [
    {path: 'profile', component: ProfileComponent, canActivate: [AuthguardService]},
    {path: 'admin', component: AdminComponent},
    {path: 'admin-reports', component: AdminReportsComponent},
    {path: 'admin-notes', component: NotesComponent},
    {path: 'projects', component: ProjectsComponent,  canActivate: [AuthguardService], children: [
      {path: 'add', component: AddProjectComponent},
      {path: 'edit', component : EditProjectComponent},
      {path: 'detail', component: ProjectComponent},
    ]},
    {path: 'lessons', canActivate: [AuthguardService], component: LessonsComponent},
    {path: 'reports', canActivate: [AuthguardService],  component: ReportsComponent},
    {path: 'students', canActivate: [AuthguardService], component: StudentsComponent}
  ]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


