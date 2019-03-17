import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Project, Projects } from './projects.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  dataSource = new MatTableDataSource<Projects>();

  projectData: Projects[] = [];
  columnNames = [
    'projeNo',
    'ders',
    'projeBaslik',
    'projeDanismani',
    'projeYurutucusu',
    'projeSuresi',
    'baslangicTarihi',
    'bitisTarihi',
    'projeAciklamasi',
    'butce'
  ]
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.projectService.getProjects().subscribe((data) => {
        this.projectData = data.slice();
      });
    });
  }

  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {

  }

}
