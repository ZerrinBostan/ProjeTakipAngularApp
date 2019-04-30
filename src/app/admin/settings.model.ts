export interface Settings {
  weekNumber: number;
  chosenWeek: number;
  vizePercentage: number;
  finalWeek: number;
  finalPercentage: number;
}
export class Setting {
  setting: Settings;
  constructor(settings: Settings) {
      this.setting = settings;
  }

}
