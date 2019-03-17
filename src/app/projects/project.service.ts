import { Injectable } from '@angular/core';
import { Projects } from './projects.model';
import { Subject, Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectData: Projects[] = [];
  constructor() { }

  addProject(project: Projects) {
    console.log(project);
    this.projectData.push(project);

  }
  getProjects(): Observable<Projects[]> {
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(this.projectData);
      observer.complete();
    });
  }
}
