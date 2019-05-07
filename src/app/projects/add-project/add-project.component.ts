import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projects } from '../projects.model';
import { LocalStorageService } from 'angular-2-local-storage';
import { SettingsService } from 'src/app/admin/settings.service';
import { Subscription } from 'rxjs';
import { StudentsService } from 'src/app/students/students.service';
import { NotificationService } from 'src/app/admin/notification.service';
import { Students } from 'src/app/students/students.model';
import { Notification } from 'src/app/admin/notification.model';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  weekNumber: number;
  projectForm = this.formBuilder.group({
    studies: [''],
    title: ['', Validators.required],
    teacher: [''],
    owner: [''],
    time: [''],
    definition: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    budget: ['', Validators.required],
    week: ''
  });
  projects: Projects;
  student: Students;
// tslint:disable-next-line: max-line-length
  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public projectService: ProjectService,
    public formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private settingService: SettingsService,
    private studentService: StudentsService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
    ) { }
  ngOnInit() {
    this.settingService.getSettings().subscribe((setting) => {
      this.weekNumber = setting.weekNumber;
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onAdd() {
    this.projects = this.projectForm.value;
    this.projects.studentId = this.localStorage.get('_id');
    this.getStudent(this.localStorage.get('_id'));
    this.projectService.addProject(this.projects).subscribe((data) => {
      let notification: Notification = {
        icon: 'work',
        message: `${this.student.name} ${this.student.surname}, ${this.projects.title} projesini ekledi.`
      };
      this.notificationService.setNotification(notification).subscribe((observer) => {
        console.log(observer);
      });
      this.snackBar.openFromComponent(SnackbarComponent, {data: 'Proje eklendi.', duration: 2000});
    });
    this.dialogRef.close();
  }
  getStudent(studentId) {
     this.studentService.getStudent(studentId).subscribe((data) => {
      this.student =  data;
    });
  }
}
