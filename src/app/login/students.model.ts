export interface Students {
  identityNumber: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  studentNumber: number;
  studentClass: string;
  studentClassGroup: string;
  password: string;
  isEnabled: boolean;
}

export class Student {
    student: Students;
    constructor(student: Students) {
        this.student = student;
    }

}
