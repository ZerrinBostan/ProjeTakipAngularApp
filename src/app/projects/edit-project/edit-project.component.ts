import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Projects } from '../projects.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  weeks = [
    '1 Hafta',
    '2 Hafta',
    '3 Hafta',
    '4 Hafta',
    '5 Hafta',
    '6 Hafta',
    '7 Hafta',
    '8 Hafta',
    '9 Hafta',
    '10 Hafta'
  ];
  projectForm = this.formBuilder.group({
    _id: [''],
    studies: [''],
    title: ['', Validators.required],
    teacher: [''],
    owner: [''],
    time: [''],
    definition: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    budget: ['', Validators.required],
    __v: [''],
  });
  projects: Projects;
// tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<AddProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: string, public projectService: ProjectService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectService.getProject(this.data).subscribe((data) => {
      this.projects = data;
      this.projectForm.setValue(this.projects);
    });

  }
  onClose() {
    this.dialogRef.close();
  }
  onEdit() {
    this.projects = this.projectForm.value;
    this.projectService.updateProject(this.projects, this.data).subscribe((data) => {
      this.dialogRef.close();
    });
  }
}
