import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students/students.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  studentsLength: number;
  constructor(private studentService: StudentsService) { }

  ngOnInit() {
  this.getAllStudents();
  }
  getAllStudents() {
    this.studentService.getStudents().subscribe((observer) => {
        this.studentsLength = observer.length;
    });
  }

}
