import { Injectable } from '@angular/core';
import { Projects, Project } from './projects.model';
import { Subject, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: Projects): Observable<Projects> {
    const url = `${environment.apiUrl}projects`;
    return this.http.post<Projects>(url, project);
  }
  getProjects(): Observable<Projects[]> {
    const url = `${environment.apiUrl}projects`;
    return this.http.get<Projects[]>(url);
  }
  getProject(id: string): Observable<Projects> {
    const url = `${environment.apiUrl}projects/${id}`;
    return this.http.get<Projects>(url);
  }
  deleteProject(id: string): Observable<Projects> {
    const url = `${environment.apiUrl}projects/${id}`;
    return this.http.delete<Projects>(url);
  }
  updateProject(project: Projects, id: string): Observable<Projects> {
    const url = `${environment.apiUrl}projects/${id}`;
    return this.http.put<Projects>(url, project);
  }
}
