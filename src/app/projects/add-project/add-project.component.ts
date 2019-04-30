import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projects } from '../projects.model';
import { LocalStorageService } from 'angular-2-local-storage';
import { SettingsService } from 'src/app/admin/settings.service';
import { Subscription } from 'rxjs';
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
// tslint:disable-next-line: max-line-length
  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public projectService: ProjectService,
    public formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private settingService: SettingsService
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
    this.projectService.addProject(this.projects).subscribe((data) => {
      console.log(data);
    });
    this.dialogRef.close();
  }
}
