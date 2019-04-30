import { Injectable } from '@angular/core';

import { Students, Student } from './students.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Students[]> {
    const url = `${environment.apiUrl}students`;
    return this.http.get<Students[]>(url);
  }
  enableStudent(id: string): Observable<boolean> {
  const url = `${environment.apiUrl}students/enable/${id}`;
  return this.http.post<boolean>(url, {isEnabled: true});
  }
  getStudent(id: string): Observable<Students> {
    const url = `${environment.apiUrl}students/${id}`;
    return this.http.get<Students>(url);
  }
  updateStudent(id: string, data: Students): Observable<Students> {
    const url = `${environment.apiUrl}students/${id}`;
    return this.http.put<Students>(url, data);
  }
}
