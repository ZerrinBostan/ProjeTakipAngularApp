import { Injectable } from '@angular/core';
import { Reports } from './reports.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  addReport(report: Reports): Observable<Reports> {
    const url = `${environment.apiUrl}Reports`;
    return this.http.post<Reports>(url, report);
  }
  getReports(): Observable<Reports[]> {
    const url = `${environment.apiUrl}Reports`;
    return this.http.get<Reports[]>(url);
  }
  getReport(id: string): Observable<Reports> {
    const url = `${environment.apiUrl}Reports/${id}`;
    return this.http.get<Reports>(url);
  }
  deleteReport(id: string): Observable<Reports> {
    const url = `${environment.apiUrl}Reports/${id}`;
    return this.http.delete<Reports>(url);
  }
  updateReport(report: Reports, id: string): Observable<Reports> {
    const url = `${environment.apiUrl}Reports/${id}`;
    return this.http.put<Reports>(url, report);
  }
}
