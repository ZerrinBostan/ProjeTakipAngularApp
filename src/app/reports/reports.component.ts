import { Component, OnInit, ViewChild } from '@angular/core';
import { TdTextEditorComponent } from '@covalent/text-editor';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('textEditor') textEditor:TdTextEditorComponent;

  constructor() { }

  ngOnInit() {
    this.textEditor.options.lineWrapping = true;
  }

}
