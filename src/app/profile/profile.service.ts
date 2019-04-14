import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from '../students/students.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }
  getUserInfo(): Observable<Students> {
    const id = this.localStorage.get('_id');
    const url = `${environment.apiUrl}students/${id}`;
    return this.http.get<Students>(url);
  }

}
