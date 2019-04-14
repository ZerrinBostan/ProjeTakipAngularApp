import { Component, OnInit, Inject } from '@angular/core';
import { ReportsService } from '../reports.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-report',
  templateUrl: './delete-report.component.html',
  styleUrls: ['./delete-report.component.css']
})
export class DeleteReportComponent implements OnInit {

// tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<DeleteReportComponent>, private reportsService: ReportsService, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
  onDelete() {
    this.reportsService.deleteReport(this.data).subscribe((data) => {
     this.dialogRef.close();
    });
  }
  onClose() {
    this.dialogRef.close();
  }

}
