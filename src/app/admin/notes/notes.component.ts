import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { StudentsService } from "src/app/students/students.service";
import { ReportsService } from "src/app/reports/reports.service";
import { Students } from "src/app/students/students.model";
import { Reports } from "src/app/reports/reports.model";
import { SettingsService } from "../settings.service";
import { LocalStorageService } from "angular-2-local-storage";
import { NotesService } from "./notes.service";
import { Notes } from './notes.model';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

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
  notesArr: Notes[];
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
  finalNote: number;
  constructor(
    private studentService: StudentsService,
    private settingService: SettingsService,
    private localStorage: LocalStorageService,
    private noteService: NotesService,
    private snackBar: MatSnackBar
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
    this.GetNotes();
  }
  onSubmit(studentId: string) {
    this.notes = {
      vize: this.vizeNote,
      final: this.finalNote,
      notes: this.notesArray,
      vizeQuiz: this.vize.nativeElement.value,
      finalQuiz: this.final.nativeElement.value,
      studentId
    };
    const note = this.GetNote(studentId);
    if (note !== undefined) {
      this.noteService.updateNotes(note._id, this.notes).subscribe((observer) => {
        if (observer) {
          this.snackBar.openFromComponent(SnackbarComponent, {duration: 2000 , data: 'Güncellendi.'});
        }
      });
    } else {
      this.noteService.setNotes(this.notes).subscribe((observer) => {
        if(observer) {
          this.snackBar.openFromComponent(SnackbarComponent, {duration: 2000 , data: 'Kaydedildi.'});
        }
      });
    }
  }
  onNoteChange(week: number, value: number, studentId?) {
// tslint:disable-next-line: prefer-for-of
    this.DeleteWeekInNoteArray(week);
    if (studentId) {
      this.GetNote(studentId).notes.forEach(element => {
        this.notesArray.push({weekNumber: element.weekNumber, note: element.note});
      });
    } else {
      this.notesArray.push({weekNumber: week, note: value});
    }
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
        total = (total * ( 100 -this.vizePercentage)) / 100;
        this.vizeNote = ((this.vize.nativeElement.value * this.vizePercentage) / 100) + total;
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
        total = (total * (100 - this.finalPercentage)) / 100;
        this.finalNote = ((this.final.nativeElement.value * this.finalPercentage) / 100) + total;
        this.finalOrtalama.nativeElement.value = this.finalNote;
      }
    }
  }
  GetNotes() {
    this.noteService.getNotes().subscribe((note) => {
      this.notesArr = note;
    });
  }
  GetNote(studenId) {
    let not;
    this.notesArr.forEach((note) => {
      if (note.studentId === studenId) {
        not = note;
      }
    });
    return not;
  }
  DeleteWeekInNoteArray(week) {
        for (let index = 0; index < this.notesArray.length; index++) {
      const element = this.notesArray[index];
      if (element['weekNumber'] === week) {
          this.notesArray.splice(index, 1);
      }
    }
  }
}

