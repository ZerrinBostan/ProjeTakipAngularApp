import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
  ];
  projectForm = this.formBuilder.group({
    ders: [''],
    projeBaslik: ['', Validators.required],
    projeDanismani: [''],
    projeYurutucusu: [''],
    projeSuresi: [''],
    projeAciklamasi: ['', Validators.required],
    baslangicTarihi: ['', Validators.required],
    bitisTarihi: ['', Validators.required],
    butce: ['', Validators.required]
  });
  projects: Projects;
  constructor( public dialogRef: MatDialogRef<AddProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: {name: 'Taha'}, public projectService: ProjectService, public formBuilder: FormBuilder) { }

  ngOnInit() {

  }
  onClose() {
    this.dialogRef.close();
  }
  onAdd() {
    this.projects = this.projectForm.value;
    this.projectService.addProject(this.projects);
    this.dialogRef.close();
  }

}
