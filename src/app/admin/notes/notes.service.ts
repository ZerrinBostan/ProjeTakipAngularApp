import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from './notes.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url = `${environment.apiUrl}notes`;
  constructor(private http: HttpClient) { }
  setNotes(notes: Notes): Observable<any> {
    return this.http.post(this.url, notes);
  }
  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.url);
  }
  updateNotes(id: any, note: Notes): Observable<Notes> {
    return this.http.put<Notes>(`${this.url}/${id}`, note);
  }
  getNote(id: any): Observable<Notes> {
    return this.http.get<Notes>(`${this.url}/${id}`);
  }
}
