export interface Reports {
  _id: any;
  no: number;
  name: string;
  surname: string;
  revisionNumber: number;
  date: Date;
  description: string;
}

export class Report {
    report: Reports;
    constructor(reports: Reports) {
        this.report = reports;
    }

}