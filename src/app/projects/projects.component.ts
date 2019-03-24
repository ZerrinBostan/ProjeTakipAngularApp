import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Project, Projects } from './projects.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from './project.service';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  dataSource = new MatTableDataSource<Projects>();

  projectData: Projects[] = [];
  columnNames = [
    'ders',
    'projeBaslik',
    'projeDanismani',
    'projeYurutucusu',
    'projeSuresi',
    'baslangicTarihi',
    'bitisTarihi',
    'projeAciklamasi',
    'butce',
    'guncelle',
    'sil'
  ]
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.projectService.getProjects().subscribe((data) => {
        this.projectData = data.slice();
      });
    });
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      width: '350px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.projectService.getProjects().subscribe((data) => {
        this.projectData = data.slice();
      });
    });
  }
  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '350px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.projectService.getProjects().subscribe((data) => {
        this.projectData = data.slice();
      });
    });
  }

  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projectData = data.slice();
    });
  }

}
