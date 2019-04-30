import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { StudentsService } from "src/app/students/students.service";
import { ReportsService } from "src/app/reports/reports.service";
import { Students } from "src/app/students/students.model";
import { Reports } from "src/app/reports/reports.model";
import { SettingsService } from "../settings.service";
import { LocalStorageService } from "angular-2-local-storage";
import { NotesService } from "./notes.service";
import { Notes } from './notes.model';

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  @ViewChild('vize') vize: ElementRef;
  @ViewChild('vizeOrtalama') vizeOrtalama: ElementRef;
  @ViewChild('final') final: ElementRef;
  @ViewChild('finalOrtalama') finalOrtalama: ElementRef;
  students: Students[];
  reports: Reports[];
  weekLength = [];
  chosenWeek: number;
  vizePercentage: number;
  finalWeek: number;
  finalPercentage: number;
  notesArray: [{weekNumber: number, note: number}] = [{
    weekNumber: 1, note:50
  }];
  notes: Notes;
  vizeNotes: number;
  vizeNote: number;
  finalNote:number;
  constructor(
    private studentService: StudentsService,
    private settingService: SettingsService,
    private localStorage: LocalStorageService,
    private noteService: NotesService
  ) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(student => {
      this.students = student;
    });
    if (this.localStorage.get("settingId")) {
      this.settingService
        .getSetting(this.localStorage.get("settingId"))
        .subscribe(setting => {
          this.chosenWeek = setting.chosenWeek;
          this.vizePercentage = setting.vizePercentage;
          this.finalWeek = setting.finalWeek;
          this.finalPercentage = setting.finalPercentage;
          for (let index = 0; index < setting.weekNumber; index++) {
            const week = index + 1;
            this.weekLength.push(week);
          }
        });
    }
  }
  onSubmit(studentId: string) {
    this.notes.vize = this.vizeNote;
    this.notes.final = this.finalNote;
    this.notes.notes = this.notesArray;
    this.notes.studentId = studentId;
    this.noteService.setNotes(this.notes).subscribe((observer) => {
      console.log(observer);
    });
  }
  onNoteChange(week: number, value: number) {
// tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.notesArray.length; index++) {
      const element = this.notesArray[index];
      if (element['weekNumber'] === week) {
          this.notesArray.splice(index, 1);
      }
    }
    this.notesArray.push({weekNumber: week, note: value});
  }
  onCalculateVize() {
    let total = 0;
    for (let index = 0; index < this.notesArray.length; index++) {
      const element = this.notesArray[index];
      if (element['weekNumber'] === this.chosenWeek) {
        for (let j = 0; j < this.chosenWeek; j++) {
          total += +this.notesArray[j]['note'];
        }
        total = total / this.chosenWeek;
        total = (total * this.vizePercentage) / 100;
        this.vizeNote = ((this.vize.nativeElement.value * (100 - this.vizePercentage)) / 100) + total;
        this.vizeOrtalama.nativeElement.value = this.vizeNote;
      }
    }
  }
  onCalculateFinal() {
    let total = 0;
    for (let index = 0; index < this.notesArray.length; index++) {
      const element = this.notesArray[index];
      if (element['weekNumber'] === this.finalWeek) {
        for (let j = 0; j < this.finalWeek; j++) {
          total += +this.notesArray[j]['note'];
        }
        total = total / this.finalWeek;
        total = (total * this.finalPercentage) / 100;
        this.finalNote = ((this.final.nativeElement.value * (100 - this.finalPercentage)) / 100) + total;
        this.finalOrtalama.nativeElement.value = this.finalNote;
      }
    }
  }
}

