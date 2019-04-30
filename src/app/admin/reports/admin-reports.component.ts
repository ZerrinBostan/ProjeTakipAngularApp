import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/projects/project.service';
import { StudentsService } from 'src/app/students/students.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { Projects } from 'src/app/projects/projects.model';
import { Reports } from 'src/app/reports/reports.model';
import { Students } from 'src/app/students/students.model';
import { TdTextEditorComponent } from '@covalent/text-editor';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  projects: Projects[];
  reports: Reports[];
  students: Students[] = [];
  @ViewChild('textEditor') textEditor: TdTextEditorComponent;
  constructor(private projectService: ProjectService, private studentService: StudentsService, private reportsService: ReportsService) { }

  ngOnInit() {
    this.getProjects();
    this.getReports();
    this.getStudents();
  }
  getProjects() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  getStudents() {
      this.studentService.getStudents().subscribe((student) => {
        this.students = student;
      });
  }
  getReports() {
    this.reportsService.getReports().subscribe((report) => {
      this.reports = report;
    });
  }

}
