import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students/students.service';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { LocalStorageService } from 'angular-2-local-storage';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  studentsLength: number;
  settings: Settings;
  settingId: any;
  constructor(
    private studentService: StudentsService,
    private settingService: SettingsService,
    private localStorage: LocalStorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  this.getAllStudents();
  if (!this.isSettingIdEmpty()) {
      this.settingService.getSetting(this.settingId).subscribe((setting) => {
        this.settings = setting;
      });
    }
  }
  getAllStudents() {
    this.studentService.getStudents().subscribe((observer) => {
        this.studentsLength = observer.length;
    });
  }
  saveSettings(weekNumber: number, chosenWeek: number, vizePercentage: number, finalWeek: number, finalPercentage: number) {
    this.settings = {weekNumber, chosenWeek, vizePercentage, finalWeek, finalPercentage};
    if (!this.isSettingIdEmpty()) {
      this.settingService.updateSetting(this.localStorage.get('settingId'), this.settings).subscribe((setting) => {
          this.snackBar.openFromComponent(SnackbarComponent, {duration: 2000 , data: 'Güncellendi.'});
      });
    } else {
      this.settingService.setSettings(this.settings).subscribe((setting) => {
        this.localStorage.set('settingId', setting);
        this.snackBar.openFromComponent(SnackbarComponent, {duration: 2000 , data: 'Kaydedildi.'});
      });
    }

  }
  isSettingIdEmpty() {
    if (this.localStorage.get('settingId')) {
      this.settingId = this.localStorage.get('settingId');
      return false;
    } else {
      return true;
    }
  }

}
