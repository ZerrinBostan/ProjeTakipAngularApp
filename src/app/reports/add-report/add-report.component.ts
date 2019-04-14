import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../reports.service';
import { Reports } from '../reports.model';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
  @ViewChild('textEditor') textEditor: TdTextEditorComponent;
  reportForm = this.formBuilder.group({
    no: ['', Validators.required],
    name: '',
    surname: '',
    revisionNumber: '',
    date: '',
    description: ''
  });
  report: Reports;
  constructor(public dialogRef: MatDialogRef<AddReportComponent>, private formBuilder: FormBuilder, private reportService: ReportsService, private localStorage: LocalStorageService) { }
  ngOnInit() {
    this.textEditor.options.lineWrapping = true;
  }
  onAdd() {
    this.report = this.reportForm.value;
    this.report.studentId = this.localStorage.get('_id');
    this.reportService.addReport(this.report).subscribe((data) => {
      console.log(data);
    });
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }

}
