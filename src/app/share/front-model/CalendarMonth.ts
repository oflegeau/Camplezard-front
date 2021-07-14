import {AppISetting} from '../interface/app.interface.setting';

export class CalendarColDate {
  public date: number;
  public col: number;
  public typeAM: number;
  public typePM: number;

  constructor(date: number, col: number, typeAM: number, typePM: number) {
    this.date = date;
    this.col = col;
    this.typeAM = typeAM;
    this.typePM = typePM;
  }

  getEvent(): string {

    if ((this.typeAM === AppISetting.DAY_DISABLE) && (this.typePM === AppISetting.DAY_DISABLE)) {
      return 'calendar-table__inactive';
    }
    if ((this.typeAM === AppISetting.DAY_WE) && (this.typePM === AppISetting.DAY_WE)) {
      return 'calendar-table__we';
    }
    if ((this.typeAM === AppISetting.DAY_PARTTIME) && (this.typePM === AppISetting.DAY_PARTTIME)) {
      return 'calendar-table__we';
    }
    if ((this.typeAM === AppISetting.DAY_HOLIDAY) && (this.typePM === AppISetting.DAY_HOLIDAY)) {
      return 'calendar-table__holiday';
    }
    if ((this.typeAM === AppISetting.DAY_OPEN) && (this.typePM === AppISetting.DAY_OPEN)) {
      return '';
    }

    // Leave //
    if ((this.typeAM === AppISetting.LEAVE) && (this.typePM === AppISetting.DAY_OPEN)) {
      return 'calendar-table__leaveAM';
    }
    if ((this.typeAM === AppISetting.LEAVE) && (this.typePM === AppISetting.LEAVE)) {
      return 'calendar-table__leave';
    }
    if ((this.typeAM === AppISetting.LEAVE) && (this.typePM === AppISetting.LEAVE_DO)) {
      return 'calendar-table__leaveAM_offPM';
    }
    if ((this.typeAM === AppISetting.LEAVE) && (this.typePM === AppISetting.LEAVE_RTT)) {
      return 'calendar-table__leaveAM_rttPM';
    }
    if ((this.typeAM === AppISetting.DAY_OPEN) && (this.typePM === AppISetting.LEAVE)) {
      return 'calendar-table__leavePM';
    }

    // off //
    if ((this.typeAM === AppISetting.LEAVE_DO) && (this.typePM === AppISetting.DAY_OPEN)) {
      return 'calendar-table__offAM';
    }
    if ((this.typeAM === AppISetting.LEAVE_DO) && (this.typePM === AppISetting.LEAVE)) {
      return 'calendar-table__offAM_leavePM';
    }
    if ((this.typeAM === AppISetting.LEAVE_DO) && (this.typePM === AppISetting.LEAVE_DO)) {
      return 'calendar-table__off';
    }
    if ((this.typeAM === AppISetting.LEAVE_DO) && (this.typePM === AppISetting.LEAVE_RTT)) {
      return 'calendar-table__offAM_rttPM';
    }
    if ((this.typeAM === AppISetting.DAY_OPEN) && (this.typePM === AppISetting.LEAVE_DO)) {
      return 'calendar-table__offPM';
    }

    // rtt //
    if ((this.typeAM === AppISetting.LEAVE_RTT) && (this.typePM === AppISetting.DAY_OPEN)) {
      return 'calendar-table__rttAM';
    }
    if ((this.typeAM === AppISetting.LEAVE_RTT) && (this.typePM === AppISetting.LEAVE)) {
      return 'calendar-table__rttAM_leavePM';
    }
    if ((this.typeAM === AppISetting.LEAVE_RTT) && (this.typePM === AppISetting.LEAVE_DO)) {
      return 'calendar-table__rttAM_offPM';
    }
    if ((this.typeAM === AppISetting.LEAVE_RTT) && (this.typePM === AppISetting.LEAVE_RTT)) {
      return 'calendar-table__rtt';
    }
    if ((this.typeAM === AppISetting.DAY_OPEN) && (this.typePM === AppISetting.LEAVE_RTT)) {
      return 'calendar-table__rttPM';
    }

    return 'calendar-table__error';
  }
}

export class CalendarRow {
  public row: number;
  public calendarDates: CalendarColDate[];

  constructor(row: number, calendarDates: CalendarColDate[]) {
    this.row = row;
    this.calendarDates = calendarDates;
  }
}

export class CalendarMonth {
  public month: number;
  public calendarRows: CalendarRow[];

  constructor(month: number, calendarRows: CalendarRow[]) {
    this.month = month;
    this.calendarRows = calendarRows;
  }

  static getCalendar(year: number, month: number, partTime: number): CalendarMonth {
    const calendarRows = new Array<CalendarRow>();
    const nbJours = AppISetting.nbDayByMonth(year, month);
    let nbJoursAvant = 0;
    if (month === 0) {
      nbJoursAvant = AppISetting.nbDayByMonth(year, 11);
    } else {
      nbJoursAvant = AppISetting.nbDayByMonth(year, month - 1);
    }
    const dateFirst = new Date(year, month, 1);

    // semaine 1 //
    const calendarDates1 = new Array<CalendarColDate>();

    // Dimanche //
    if (dateFirst.getDay() === 0) {
      if (AppISetting.isDayOff(new Date(year, month, 1))) {
        calendarDates1[6] = new CalendarColDate(1, 7, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
      } else {
        calendarDates1[6] = new CalendarColDate(1, 7, AppISetting.DAY_WE, AppISetting.DAY_WE);
      }

      for (let i = 0; i < 6; i++) {
        calendarDates1[5 - i] = new CalendarColDate(nbJoursAvant - i, 6 - i, AppISetting.DAY_DISABLE, AppISetting.DAY_DISABLE);
      }
    } else {
      let dateA = 1;
      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      const dayWeek = dateFirst.getDay();
      for (let i = 0; i < dayWeek - 1; i++) {
        calendarDates1[i] = new CalendarColDate(nbJoursAvant - dayWeek + i + 2, i + 1, AppISetting.DAY_DISABLE, AppISetting.DAY_DISABLE);
      }
      for (let i = dayWeek - 1; i < 7; i++) {
        const dateTest = new Date(year, month, dateA);
        if (AppISetting.isDayOff(dateTest)) {
          calendarDates1[i] = new CalendarColDate(dateA, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
         } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendarDates1[i] = new CalendarColDate(dateA, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
        } else {
          calendarDates1[i] = new CalendarColDate(dateA, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
        }
        dateA += 1;
      }
    }
    calendarRows.push(new CalendarRow(2, calendarDates1));

    // semaine 2 //
    let datePrev = calendarDates1[6].date;
    const calendarDates2 = new Array<CalendarColDate>();
    for (let i = 0; i < 7; i++) {
      datePrev++;
      const dateTest = new Date(year, month,datePrev);
      if (AppISetting.isDayOff(dateTest)) {
        calendarDates2[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendarDates2[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
      } else {
        calendarDates2[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
      }
    }
    calendarRows.push(new CalendarRow(3, calendarDates2));

    // semaine 3 //
    const calendarDates3 = new Array<CalendarColDate>();
    datePrev = calendarDates2[6].date;
    for (let i = 0; i < 7; i++) {
      datePrev++;
      const dateTest = new Date(year, month,datePrev);
      if (AppISetting.isDayOff(dateTest)) {
        calendarDates3[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendarDates3[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
      } else {
        calendarDates3[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
      }
    }
    calendarRows.push(new CalendarRow(4, calendarDates3));

    // semaine 4 //
    const calendarDates4 = new Array<CalendarColDate>();
    datePrev = calendarDates3[6].date;
    for (let i = 0; i < 7; i++) {
      datePrev++;
      const dateTest = new Date(year, month,datePrev);
      if (AppISetting.isDayOff(dateTest)) {
        calendarDates4[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
      } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
        calendarDates4[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
      } else {
        calendarDates4[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
      }
    }
    calendarRows.push(new CalendarRow(5, calendarDates4));

    // semaine 5 //
    const calendarDates5 = new Array<CalendarColDate>();
    datePrev = calendarDates4[6].date;
    if ((nbJours - datePrev) <= 7) {
      let datel = datePrev + 1;
      let newdate = 1;

      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      for (let i = 0; i < nbJours - datePrev; i++) {
        const dateTest = new Date(year, month,datel);
        if (AppISetting.isDayOff(dateTest)) {
          calendarDates5[i] = new CalendarColDate(datel, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendarDates5[i] = new CalendarColDate(datel, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
        } else {
          calendarDates5[i] = new CalendarColDate(datel, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
        }
        datel += 1;
      }
      for (let i = nbJours - datePrev; i < 7; i++) {
        calendarDates5[i] = new CalendarColDate(newdate, i + 1, AppISetting.DAY_DISABLE, AppISetting.DAY_DISABLE);
        newdate += 1;
      }

      calendarRows.push(new CalendarRow(6, calendarDates5));

      const calendarDates6 = new Array<CalendarColDate>();
      for (let i = 0; i < 7; i++) {
        calendarDates6[i] = new CalendarColDate(0, i + 1, AppISetting.DAY_DISABLE, AppISetting.DAY_DISABLE);
      }
      calendarRows.push(new CalendarRow(7, calendarDates6));

    } else {
      for (let i = 0; i < 7; i++) {
        datePrev++;
        const dateTest = new Date(year, month,datePrev);
        if (AppISetting.isDayOff(dateTest)) {
          calendarDates5[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendarDates5[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
        } else {
          calendarDates5[i] = new CalendarColDate(datePrev, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
        }
      }

      calendarRows.push(new CalendarRow(6, calendarDates5));

      // semaine 6 //
      const calendarDates6 = new Array<CalendarColDate>();
      datePrev = calendarDates5[6].date;
      let datel1 = calendarDates5[6].date + 1;
      let newdate1 = 1;

      // Lundi(1) - Mardi(2) - Mer(3) - Jeudi(4) - Ven(5) - Sam(6)
      for (let i = 0; i < nbJours - datePrev; i++) {
        const dateTest = new Date(year, month,datel1);
        if (AppISetting.isDayOff(dateTest)) {
          calendarDates6[i] = new CalendarColDate(datel1, i + 1, AppISetting.DAY_HOLIDAY, AppISetting.DAY_HOLIDAY);
        } else if ((i >= 5) || ((partTime !==0) && (partTime === dateTest.getDay()))) {
          calendarDates6[i] = new CalendarColDate(datel1, i + 1, AppISetting.DAY_WE, AppISetting.DAY_WE);
        } else {
          calendarDates6[i] = new CalendarColDate(datel1, i + 1, AppISetting.DAY_OPEN, AppISetting.DAY_OPEN);
        }
        datel1 += 1;
      }
      for (let i = nbJours - datePrev; i < 7; i++) {
        calendarDates6[i] = new CalendarColDate(newdate1, i + 1, AppISetting.DAY_DISABLE, AppISetting.DAY_DISABLE);
        newdate1 += 1;
      }

      calendarRows.push(new CalendarRow(7, calendarDates6));
    }
    return new CalendarMonth(month, calendarRows);
  }
}
