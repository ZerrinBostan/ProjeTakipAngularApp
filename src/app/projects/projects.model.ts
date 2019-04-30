export interface Projects {
  _id: string;
  studentId: string;
  no: number;
  studies: string;
  title: string;
  teacher: string;
  owner: string;
  time: string;
  start_time: Date;
  end_time: Date;
  definition: string;
  budget: string;
}

export class Project {
    project: Projects;
    constructor(projects: Projects) {
        this.project = projects;
    }

}
