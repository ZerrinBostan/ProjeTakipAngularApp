import { Component, OnInit, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-componentheaders',
  templateUrl: './componentheaders.component.html',
  styleUrls: ['./componentheaders.component.css']
})
export class ComponentheadersComponent implements OnInit {
  @Input() componentName: string;
  @Input() componentIcon: string;
  @Input() description: string;
  constructor() { }
  ngOnInit() {
  }

}
