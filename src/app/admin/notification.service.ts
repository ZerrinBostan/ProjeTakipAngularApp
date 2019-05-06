import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = `${environment.apiUrl}notification`;
  constructor(private http: HttpClient) { }

  getNotification(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.url);
  }
  setNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.url, notification);
  }
}
