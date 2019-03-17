export interface Projects {
    projeNo: number;
    ders: string;
    projeBaslik: string;
    projeDanismani: string;
    projeYurutucusu: string;
    projeSuresi: string;
    projeAciklamasi: string;
    baslangicTarihi: string;
    bitisTarihi: string;
    butce: number;
}

export class Project {
    project: Projects;
    constructor(projects: Projects) {
        this.project = projects;
    }

}