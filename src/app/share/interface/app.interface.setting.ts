
export class AppISetting {
  public static HTTP_OK = 200;
  public static HTTP_CREATED = 201;
  public static HTTP_ACCEPTED = 202;
  public static HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
  public static HTTP_NO_CONTENT = 204;

  public static HTTP_BAD_REQUEST = 400;
  public static HTTP_UNAUTHORIZED = 401;
  public static HTTP_FORBIDDEN = 403;
  public static HTTP_NOTFOUND = 404;
  public static HTTP_FAIL = 417;
  public static HTTP_ERROR = 500;

  public static ROLE_ADMIN = 5;
  public static ROLE_MANAGER = 4;
  public static ROLE_CUSTOMER = 3;
  public static ROLE_MEMBER = 2;
  public static ROLE_USER = 1;

  public static LEAVE = 10;
  public static LEAVE_DO = 11;
  public static LEAVE_RTT = 12;
  public static LEAVE_CT = 13;

  public static DAY_DISABLE = 20;
  public static DAY_OPEN = 21;
  public static DAY_WE = 22;
  public static DAY_PARTTIME = 23;
  public static DAY_HOLIDAY = 24;

  public static PLACE_ALL= 0;
  public static PLACE_STATE = 1;
  public static PLACE_OFF = 2;
  public static PLACE_BUSY = 3;
  public static PLACE_BOOKED = 4;
  public static PLACE_FREE = 5;

  public static MEMBER_ALL = 0;
  public static MEMBER_MEMBER = 1;
  public static MEMBER_CLIENT = 2;
  public static MEMBER_OUT = 3;

  public static PROJECT_ALL = 0;
  public static PROJECT_STRUCT = 1;
  public static PROJECT_TIME = 2;
  public static PROJECT_DAAS = 3;
  public static PROJECT_FIXED = 4;
  public static PROJECT_NF = 5;
  public static PROJECT_CT = 6;

  public static toastOptions = {timeOut: 5000,
                                closeButton: true,
                                enableHtml: true,
                                toastClass: 'alert alert-info alert-with-icon',
                                positionClass: 'toast-top-right'};



  public static getColor(type: string, origin: number, i: number): string {
    const rotColorBtnStruct = [ 'btn-secondary', 'btn-info', 'btn-blue','btn-teal', 'btn-success',  'btn-cyan',
      'btn-secondary', 'btn-info', 'btn-blue','btn-teal', 'btn-success',  'btn-cyan',
      'btn-secondary', 'btn-info', 'btn-blue','btn-teal', 'btn-success',  'btn-cyan'];
    const rotColorBtnWork = [  'btn-primary',  'btn-warning', 'btn-yellow', 'btn-orange',
      'btn-primary',  'btn-warning', 'btn-yellow', 'btn-orange',
      'btn-primary',  'btn-warning', 'btn-yellow', 'btn-orange'];
    const rotColorBtnLeave = [ 'btn-danger', 'btn-red' , 'btn-pink',
      'btn-danger', 'btn-red' , 'btn-pink',
      'btn-danger', 'btn-red' , 'btn-pink',];

    const rotColorTxtStruct = [ 'text-white', 'text-white',  'text-black-50', 'text-black-50', 'text-white', 'text-black-50',
      'text-white', 'text-white',  'text-black-50', 'text-black-50', 'text-white', 'text-black-50',
      'text-white', 'text-white',  'text-black-50', 'text-black-50', 'text-white', 'text-black-50'];
    const rotColorTxtWork = [   'text-black-50', 'text-black-50',  'text-black-50','text-black-50 ',
      'text-black-50', 'text-black-50',  'text-black-50','text-black-50 ',
      'text-black-50', 'text-black-50',  'text-black-50','text-black-50 '];
    const rotColorTxtLeave = [  'text-black-50','text-white', 'text-black-50',
      'text-black-50','text-white', 'text-black-50',
      'text-black-50','text-white', 'text-black-50'];

    const rotColorStruct = [ '#217CA3', '#5998B3', '#78CCF0','#11cdef', '#1CB4BA',  '#2bffc6', '#1CB4BA',
      '#217CA3', '#5998B3', '#78CCF0','#11cdef', '#1CB4BA',  '#2bffc6',
      '#217CA3', '#5998B3', '#78CCF0','#11cdef', '#1CB4BA',  '#2bffc6'];
    const rotColorWork = [   '#F0A132',  '#F0BA18', '#eec756', '#e98e10',
      '#F0A132',  '#F0BA18', '#eec756', '#e98e10',
      '#F0A132',  '#F0BA18', '#eec756', '#e98e10'];
    const rotColorLeave = [  '#F07148', '#e9607d' , '#f3a4b5' ,
      '#F07148', '#e9607d' , '#f3a4b5',
      '#F07148', '#e9607d' , '#f3a4b5'];

    switch(type) {
      case 'btn':
        switch (origin) {
          case this.PROJECT_STRUCT : return rotColorBtnStruct[i];
          case this.PROJECT_TIME : return rotColorBtnWork[i];
          case this.PROJECT_NF : return 'btn-neutral';
          case this.PROJECT_CT : return 'btn-purple';
          case this.LEAVE : return rotColorBtnLeave[i];
        }
        break;

      case 'txt':
        switch (origin) {
          case this.PROJECT_STRUCT : return rotColorTxtStruct[i];
          case this.PROJECT_TIME : return rotColorTxtWork[i];
          case this.PROJECT_NF : return 'text-black-50';
          case this.PROJECT_CT : return 'text-black-50';
          case this.LEAVE : return rotColorTxtLeave[i];
        }
        break;

      case 'color':
        switch (origin) {
          case this.PROJECT_STRUCT : return rotColorStruct[i];
          case this.PROJECT_TIME : return rotColorWork[i];
          case this.PROJECT_NF : return '#e3e3e3';
          case this.PROJECT_CT : return '#8965e0';
          case this.LEAVE : return rotColorLeave[i];
        }
        break;
    }
    return  '';
  }



  public static getDayOff(year:number): Array<Date> {
    const tab = new Array<Date>();

    tab.push(new Date(year, 0, 1));
    tab.push(new Date(year, 4, 1));
    tab.push(new Date(year, 4, 8));
    tab.push(new Date(year,6, 14));
    tab.push(new Date(year, 7, 15));
    tab.push(new Date(year, 10, 1));
    tab.push(new Date(year, 10, 11));
    tab.push(new Date(year, 11, 25));

    const G = year%19;
    const C = Math.floor(year/100);
    const H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30;
    const I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11));
    const J = (year + Math.floor(year/4) + I + 2 - C + Math.floor(C/4))%7;
    const L = I - J;
    const MoisPaques = 3 + Math.floor((L + 40)/44);
    const JourPaques = L + 28 - 31*Math.floor(MoisPaques/4);

    tab.push(new Date(year, MoisPaques-1, JourPaques));
    tab.push(new Date(year, MoisPaques-1, JourPaques+1));
    tab.push(new Date(year, MoisPaques-1, JourPaques+39));
    tab.push(new Date(year, MoisPaques-1, JourPaques+49));
    tab.push(new Date(year, MoisPaques-1, JourPaques+50));

    return tab;
  }

  public static nbDayByMonth(year: number, month: number): number {             // mois de 0 à 11 //
    return new Date(year, month +1, 0).getDate();
  }

  public static nbOpenedDayByMonth(year: number, month: number): number {       // mois de 0 à 11 //
    const nbDays = this.nbDayByMonth(year, month);
    let nb = 0;
    for (let i= 1; i <= nbDays; i++ ) {
      if (this.isOpened(new Date(year, month , i))) {
        nb++;
      }
    }
    return nb;
  }

  public static isDayOff(date: Date): boolean {
    const tab = this.getDayOff(date.getFullYear());
    let nbj=0;
    while (nbj < tab.length) {
      if (tab[nbj].getTime() === date.getTime()) {
        return true;
      }
      nbj++;
    }
    return false;
  }

  public static isOpened(date: Date): boolean {
    if ((date.getDay() === 6) || (date.getDay() === 0)) { return false; }
    const tab = this.getDayOff(date.getFullYear());
    let nbj=0;
    while (nbj < tab.length) {
      if (tab[nbj].getTime() === date.getTime()) {
        return false;
      }
      nbj++;
    }
    return true;
  }

  public static getPeriodFromDate(date: Date): string {
    let startYearMonth = date.getFullYear() + '-';
    if (date.getMonth() + 1 < 10) {
      startYearMonth += '0' + (date.getMonth() + 1).toString();
    } else {
      startYearMonth += (date.getMonth() + 1).toString();
    }
    return startYearMonth;
  }

  public static getPeriodMore(period: string): string { // mois 1 à 12
    let year = parseInt(period.substring(0,4),10);
    let month = parseInt(period.substring(5,7),10);

    if (month === 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }

    if (month < 10) {
      return year.toString() + '-0' + month.toString();
    } else {
      return year.toString() + '-' + month.toString();
    }
  }

  public static getDateFromPeriod(period: string, start: boolean): Date {
    const startDate = new Date(       parseInt(period.substring(0,4),10),
                               parseInt(period.substring(5,7),10) - 1,
                              1);
    const endDate =  new Date(parseInt(period.substring(0,4),10),
                       parseInt(period.substring(5,7),10) - 1,
                              this.nbDayByMonth(parseInt(period.substring(0,4),10),
                                         parseInt(period.substring(5,7),10) - 1));

    if (start === true) {
      return startDate;
    } else {
      return endDate;
    }
  }

  public static getDateText(date: Date): string {
    const months = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai.', 'Jui.', 'Jul.', 'Aou.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' '  + date.getFullYear();
  }

  public static getDateNumber(date: Date): string {

    if (date.getMonth() + 1 < 10) {
      if (date.getDate() < 10) {
        return '0' + date.getDate() + '/0' + (date.getMonth()+1).toString() + '/'  + date.getFullYear();
      } else {
        return date.getDate() + '/0' + (date.getMonth()+1).toString() + '/'  + date.getFullYear();
      }
    } else {
      if (date.getDate() < 10) {
        return '0' + date.getDate() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear();
      } else {
        return date.getDate() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear();
      }
    }
  }
}
