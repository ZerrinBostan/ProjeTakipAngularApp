import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projects } from '../projects.model';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
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
    studies: [''],
    title: ['', Validators.required],
    teacher: [''],
    owner: [''],
    time: [''],
    definition: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    budget: ['', Validators.required]
  });
  projects: Projects;
// tslint:disable-next-line: max-line-length
  constructor( public dialogRef: MatDialogRef<AddProjectComponent>, public projectService: ProjectService, public formBuilder: FormBuilder) { }
  ngOnInit() {

  }
  onClose() {
    this.dialogRef.close();
  }
  onAdd() {
    this.projects = this.projectForm.value;
    this.projectService.addProject(this.projects).subscribe((data) => {
      console.log(data);
    });
    this.dialogRef.close();
  }
}
