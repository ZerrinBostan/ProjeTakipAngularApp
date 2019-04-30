import { Injectable, EventEmitter } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  url = `${environment.apiUrl}settings`;
  constructor(private http: HttpClient) { }
  setSettings(setting: Settings): Observable<any> {
    return this.http.post<any>(this.url, setting);
  }
  getSettings(): Observable<Settings> {
   return this.http.get<Settings>(this.url);
  }
  getSetting(id: any): Observable<Settings> {
    return this.http.get<Settings>(this.url + `/${id}`);
   }
  updateSetting(id: any, setting: Settings): Observable<any> {
    return this.http.put<any>(this.url + `/${id}`, setting);
  }
}
