import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CovalentTextEditorModule } from '@covalent/text-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {MaterialModule} from './material-module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LocalStorageModule } from 'angular-2-local-storage';

import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectComponent } from './projects/project/project.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ComponentheadersComponent } from './componentheaders/componentheaders.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { AddReportComponent } from './reports/add-report/add-report.component';
import { EditReportComponent } from './reports/edit-report/edit-report.component';
import { DeleteReportComponent } from './reports/delete-report/delete-report.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectComponent,
    LessonsComponent,
    ComponentheadersComponent,
    ReportsComponent,
    ProfileComponent,
    DeleteProjectComponent,
    AddReportComponent,
    EditReportComponent,
    DeleteReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    CovalentTextEditorModule,
    LocalStorageModule.forRoot({
      prefix: 'storage',
      storageType: 'localStorage'
    })
  ],
  entryComponents:[DeleteProjectComponent, AddReportComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
