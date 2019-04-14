import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { Reports } from './reports.model';
import { ReportsService } from './reports.service';
import { AddReportComponent } from './add-report/add-report.component';
import { DeleteReportComponent } from './delete-report/delete-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { MatTableDataSource, MatDialog } from '@angular/material';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  reportData: Reports[] = [];
  constructor(private reportService: ReportsService, public dialog: MatDialog) { }
  columnNames = [
    'no',
    'name',
    'surname',
    'revisionNumber',
    'date',
    'description',
    'guncelle',
    'sil'
  ];
  ngOnInit() {
    this.reportService.getReports().subscribe((data) => {
      this.reportData = data;
    });
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddReportComponent, {
      width: '750px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reportService.getReports().subscribe((data) => {
        this.reportData = data.slice();
      });
    });
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteReportComponent, {
      width: '350px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reportService.getReports().subscribe((data) => {
        this.reportData = data.slice();
      });
    });
  }
  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditReportComponent, {
      width: '350px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reportService.getReports().subscribe((data) => {
        this.reportData = data.slice();
      });
    });
  }
}
