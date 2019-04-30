export interface Reports {
  _id: any;
  studentId: string;
  no: number;
  name: string;
  surname: string;
  revisionNumber: number;
  date: Date;
  description: string;
  projectId: string;
}

export class Report {
    report: Reports;
    constructor(reports: Reports) {
        this.report = reports;
    }

}
