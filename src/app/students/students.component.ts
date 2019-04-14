import { Component, OnInit } from '@angular/core';
import { Students } from './students.model';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { StudentsService } from './students.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<Students>();
  studentData: Students[];
  columnNames = [
    'identityNumber',
    'email',
    'name',
    'surname',
    'phoneNumber',
    'studentNumber',
    'studentClass',
    'studentClassGroup',
    'isEnabled'
  ];
  constructor(private studentService: StudentsService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe((observer) => {
      this.studentData = observer;
    });
  }
  onEnableStudent(id: string) {
    this.studentService.enableStudent(id).subscribe((observer) => {
      if (observer) {
        this.snackBar.openFromComponent(SnackbarComponent, {duration: 2000, data: 'Onaylandı.'});
      }
    });
  }

}
