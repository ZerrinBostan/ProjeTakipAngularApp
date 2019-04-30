export interface Notes {
  studentId: string;
  notes: [{
    note: number,
    weekNumber: number
  }];
  vize: number;
  final: number;
}
export class Note {
  note: Notes;
  constructor(notes: Notes) {
      this.note = notes;
  }

}
