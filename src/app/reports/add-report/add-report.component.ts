import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { Reports } from '../reports.model';
import { LocalStorageService } from 'angular-2-local-storage';
import { StudentsService } from 'src/app/students/students.service';
import { ProjectService } from 'src/app/projects/project.service';
import { Projects } from 'src/app/projects/projects.model';
import { NotificationService } from 'src/app/admin/notification.service';
import { Students } from 'src/app/students/students.model';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
  @ViewChild('textEditor') textEditor: TdTextEditorComponent;
  reportForm = this.formBuilder.group({
    no: ['', Validators.required],
    name: '',
    surname: '',
    revisionNumber: '',
    date: '',
    description: '',
    projectId: ''
  });
  report: Reports;
  projects: Projects[];
  students: Students;
  constructor(
    public dialogRef: MatDialogRef<AddReportComponent>,
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private localStorage: LocalStorageService,
    private studentService: StudentsService,
    private projectService: ProjectService,
    private notificationService: NotificationService
    ) { }
  ngOnInit() {
    this.textEditor.options.lineWrapping = true;
    this.getProjects();
    this.getStudent(this.localStorage.get('_id'));
  }
  onAdd() {
    this.report = this.reportForm.value;
    this.report.studentId = this.localStorage.get('_id');
    this.reportService.addReport(this.report).subscribe((report) => {
      this.notificationService.setNotification({
        icon: 'description',
        message: `${this.students.name} ${this.students.surname}, ${report.no}no'lu raporunu ekledi.`
      }).subscribe((data) => {
        console.log(data);
      });
    });
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }
  getProjects() {
    this.projectService.getProjects().subscribe((project) => {
      this.projects = project;
    });
  }
  getStudent(id: any) {
    this.studentService.getStudent(id).subscribe((observer) => {
      this.students = observer;
    });
  }

}
