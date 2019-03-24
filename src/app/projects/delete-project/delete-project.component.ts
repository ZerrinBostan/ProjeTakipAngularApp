import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {

// tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>, private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
  onDelete() {
    this.projectService.deleteProject(this.data).subscribe((data) => {
     this.dialogRef.close();
    });
  }
  onClose() {
    this.dialogRef.close();
  }

}
