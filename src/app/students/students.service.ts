import { Injectable } from '@angular/core';

import { Students } from './students.model';
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
}
