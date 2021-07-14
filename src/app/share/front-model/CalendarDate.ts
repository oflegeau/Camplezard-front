import {AppISetting} from '../interface/app.interface.setting';

export class CalendarDayEvent {
  public project: string;
  public client: string;
  public color: string;
  public colorBtn: string;
  public colorTxt: string;

  constructor(project: string, client: string, color: string, colorBtn: string, colorTxt: string) {
    this.project = project;
    this.client = client;
    this.color = color;
    this.colorBtn = colorBtn;
    this.colorTxt = colorTxt;
  }
}

export class CalendarDay {

  public isSpecial: boolean;          // WE et féré
  public dayWeek: number;             // Lundi
  public date: number;                // 3
  public first: number[];             // slots * 8 (2j max)
  public last: number[];
  public id: number[];
  public assigned: boolean[];
  public colors: CalendarDayEvent[];

  // tslint:disable-next-line:max-line-length
  constructor(isSpecial: boolean, dayWeek: number, date: number, first: number[], last: number[], id: number[], assigned: boolean[], colors: CalendarDayEvent[]) {
    this.isSpecial = isSpecial;
    this.dayWeek = dayWeek;
    this.date = date;
    this.first = first;
    this.last = last;
    this.id = id;
    this.assigned = assigned;
    this.colors = colors;
  }
}

export class CalendarDateEvent {
  public quarter: number[];
  public color: string;


  constructor(quarter: number[], color: string) {
    this.quarter = quarter;
    this.color = color;
  }

  getTypeCSS(): string[] {
    const tab = new Array<string>();
    this.quarter.forEach(item => {
      tab.push('quarter' + item.toString());
    });
    return tab;
  }
}

export class CalendarDate {
  public date: number;
  public type: number;
  public col: number;
  public row: number;
  public calendarEvents: CalendarDateEvent[];

  constructor(date: number, type: number, col: number, row: number, calendarEvents: CalendarDateEvent[]) {
    this.date = date;
    this.type = type;
    this.col = col;
    this.row = row;
    this.calendarEvents = calendarEvents;
  }

  static getCalendaMonth(year: number, month: number, partTime: number): CalendarDate[] {
    const calendars = new Array<CalendarDate>();
    const nbJours = AppISetting.nbDayByMonth(year, month);
    let nbJoursAvant = 0;
    if (month === 0) {
      nbJoursAvant = AppISetting.nbDayByMonth(year, 11);
    } else {
      nbJoursAvant = AppISetting.nbDayByMonth(year, month - 1);
    }
    const dateFirst = new Date(year, month, 1);

    // semaine 1 //
    // Dimanche //
    if (dateFirst.getDay() === 0) {
      if (AppISetting.isDayOff(new Date( year,  month, 1))) {
        calendars[6] = new CalendarDate(1, AppISetting.DAY_HOLIDAY, 7, 2, new Array<CalendarDateEvent>());
      } else {
        calendars[6] = new CalendarDate(1, AppISetting.DAY_WE, 7, 2, new Array<CalendarDateEvent>());
      }
      for (let i = 0; i < 6; i++) {
          calendars[5 - i] = new CalendarDate(nbJoursAvant - i, AppISetting.DAY_DISABLE, 6 - i, 2, new Array<CalendarDateEvent>());
      }
    } else {
      let dateA = 1;
      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      const dayWeek = dateFirst.getDay();
      for (let i = 0; i < dayWeek - 1; i++) {
        calendars[i] = new CalendarDate(nbJoursAvant - dayWeek + i + 2, AppISetting.DAY_DISABLE, i + 1, 2, new Array<CalendarDateEvent>());
      }
      for (let i = dayWeek - 1; i < 7; i++) {
        const dateTest = new Date(year, month, dateA);
        if (AppISetting.isDayOff(dateTest)) {
          calendars[i] = new CalendarDate(dateA, AppISetting.DAY_HOLIDAY, i + 1, 2, new Array<CalendarDateEvent>());
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendars[i] = new CalendarDate(dateA, AppISetting.DAY_WE, i + 1, 2, new Array<CalendarDateEvent>());
        } else {
          calendars[i] = new CalendarDate(dateA, AppISetting.DAY_OPEN, i + 1, 2, new Array<CalendarDateEvent>());
        }
        dateA += 1;
      }
    }
    // semaine 2 - 3 - 4 //
    for (let i = 0; i < 7; i++) {
      const dateTest = new Date(year, month,calendars[i + 6].date + 1);
      if (AppISetting.isDayOff(dateTest)) {
        calendars[i + 7] = new CalendarDate(calendars[i + 6].date + 1, AppISetting.DAY_HOLIDAY, i + 1, 3, new Array<CalendarDateEvent>());
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendars[i + 7] = new CalendarDate(calendars[i + 6].date + 1, AppISetting.DAY_WE, i + 1, 3, new Array<CalendarDateEvent>());
      } else {
        calendars[i + 7] = new CalendarDate(calendars[i + 6].date + 1, AppISetting.DAY_OPEN, i + 1, 3, new Array<CalendarDateEvent>());
      }
    }
    for (let i = 0; i < 7; i++) {
      const dateTest = new Date(year, month,calendars[i + 13].date + 1);
      if (AppISetting.isDayOff(dateTest)) {
        calendars[i + 14] = new CalendarDate(calendars[i + 13].date + 1, AppISetting.DAY_HOLIDAY, i + 1, 4, new Array<CalendarDateEvent>());
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendars[i + 14] = new CalendarDate(calendars[i + 13].date + 1, AppISetting.DAY_WE, i + 1, 4, new Array<CalendarDateEvent>());
      } else {
        calendars[i + 14] = new CalendarDate(calendars[i + 13].date + 1, AppISetting.DAY_OPEN, i + 1, 4, new Array<CalendarDateEvent>());
      }
    }
    for (let i = 0; i < 7; i++) {
      const dateTest = new Date(year, month,calendars[i + 20].date + 1);
      if (AppISetting.isDayOff(dateTest)) {
        calendars[i + 21] = new CalendarDate(calendars[i + 20].date + 1, AppISetting.DAY_HOLIDAY, i + 1, 5, new Array<CalendarDateEvent>());
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendars[i + 21] = new CalendarDate(calendars[i + 20].date + 1, AppISetting.DAY_WE, i + 1, 5, new Array<CalendarDateEvent>());
      } else {
        calendars[i + 21] = new CalendarDate(calendars[i + 20].date + 1, AppISetting.DAY_OPEN, i + 1, 5, new Array<CalendarDateEvent>());
      }
    }

    // semaine 5
    if ((nbJours - calendars[27].date) <= 7) {
      let datel = calendars[27].date + 1;
      let newdate = 1;

      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      for (let i = 0; i < nbJours - calendars[27].date; i++) {
        const dateTest = new Date(year, month,datel);
        if (AppISetting.isDayOff(dateTest)) {
          calendars[i + 28] = new CalendarDate(datel, AppISetting.DAY_HOLIDAY, i + 1, 6, new Array<CalendarDateEvent>());
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendars[i + 28] = new CalendarDate(datel, AppISetting.DAY_WE, i + 1, 6, new Array<CalendarDateEvent>());
        } else {
          calendars[i + 28] = new CalendarDate(datel, AppISetting.DAY_OPEN, i + 1, 6, new Array<CalendarDateEvent>());
        }
        datel += 1;
      }
      for (let i = nbJours - calendars[27].date; i < 7; i++) {
        calendars[i + 28] = new CalendarDate(newdate, AppISetting.DAY_DISABLE, i + 1, 6, new Array<CalendarDateEvent>());
        newdate += 1;
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const dateTest = new Date(year, month, calendars[i + 27].date + 1);
        if (AppISetting.isDayOff(dateTest)) {
          calendars[i + 28] = new CalendarDate(calendars[i + 27].date + 1, AppISetting.DAY_HOLIDAY, i + 1, 6, new Array<CalendarDateEvent>());
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendars[i + 28] = new CalendarDate(calendars[i + 27].date + 1, AppISetting.DAY_WE, i + 1, 6, new Array<CalendarDateEvent>());
        } else {
          calendars[i + 28] = new CalendarDate(calendars[i + 27].date + 1, AppISetting.DAY_OPEN, i + 1, 6, new Array<CalendarDateEvent>());
        }
      }

      let datel1 = calendars[34].date + 1;
      let newdate1 = 1;

      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      for (let i = 0; i < nbJours - calendars[34].date; i++) {
        const dateTest = new Date(year, month, datel1);
        if (AppISetting.isDayOff(dateTest)) {
          calendars[i + 35] = new CalendarDate(datel1, AppISetting.DAY_HOLIDAY, i + 1, 7, new Array<CalendarDateEvent>());
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendars[i + 35] = new CalendarDate(datel1, AppISetting.DAY_WE, i + 1, 7, new Array<CalendarDateEvent>());
        } else {
          calendars[i + 35] = new CalendarDate(datel1, AppISetting.DAY_OPEN, i + 1, 7, new Array<CalendarDateEvent>());
        }
        datel1 += 1;
      }
      for (let i = nbJours - calendars[34].date; i < 7; i++) {
        calendars[i + 35] = new CalendarDate(newdate1, AppISetting.DAY_DISABLE, i + 1, 7, new Array<CalendarDateEvent>());
        newdate1 += 1;
      }
    }
    return calendars;
  }

  getCSS(): string {
    switch (this.type) {
      case AppISetting.DAY_DISABLE: return 'day day-disabled';
      case AppISetting.DAY_WE:      return 'day day-we';
      case AppISetting.DAY_HOLIDAY: return 'day day-holiday';
      case AppISetting.DAY_OPEN:    return 'day';
      default:                      return 'day';
    }
  }
}
