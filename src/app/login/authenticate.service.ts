import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Students, Student } from '../students/students.model';
import { Observable } from 'rxjs';
import { Admin } from '../admin/admin.model'
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLogin = new EventEmitter<boolean>();
  constructor(private http: HttpClient) { }
  register(students: Students): Observable<Students> {
    const url = `${environment.apiUrl}students/register`;
    return this.http.post<Students>(url, students);
  }
  authenticate(studentNumber, password): Observable<Students> {
    const url = `${environment.apiUrl}students/authenticate`;
    return this.http.post<Students>(url, {studentNumber, password});
  }
  adminAuthenticate(userName, password): Observable<Admin> {
    const url =  `${environment.apiUrl}admin/authenticate`;
    return this.http.post<Admin>(url, {userName, password});
  }
}
