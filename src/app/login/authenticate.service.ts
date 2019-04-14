import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students, Student } from './students.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLogin = new EventEmitter<boolean>();
  constructor(private http: HttpClient) { }
  register(students: Students): Observable<Student> {
    const url = `${environment.apiUrl}students/register`;
    return this.http.post<Student>(url, students);
  }
  authenticate(studentNumber, password): Observable<Student> {
    const url = `${environment.apiUrl}students/authenticate`;
    return this.http.post<Student>(url, {studentNumber, password});
  }
}
