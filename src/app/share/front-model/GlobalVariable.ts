import {AppISetting} from '../interface/app.interface.setting';

export class PeriodMonth {

    public year: number;             // année sur 4 chiffres
    public month: number;            // mois de 0 à 11

    public startPeriod: Date;
    public endPeriod: Date;

    public labelYearMonth: string;
    public labelMonth: string;
    public yearMonth: string;
    public nbDaysMonth: number;
    public nbOpenedMonth: number;

    // tslint:disable-next-line:max-line-length
    constructor(year: number, month: number, startPeriod: Date, endPeriod: Date, labelYearMonth: string, labelMonth: string, yearMonth: string, nbDaysMonth: number, nbOpenedMonth: number) {
        this.year = year;
        this.month = month;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
        this.labelYearMonth = labelYearMonth;
        this.labelMonth = labelMonth;
        this.yearMonth = yearMonth;
        this.nbDaysMonth = nbDaysMonth;
        this.nbOpenedMonth = nbOpenedMonth;
    }

    public static getPeriodMonthFromN(year: number, month: number): PeriodMonth {

        const months = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai.', 'Jui.', 'Jul.', 'Aou.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
        const startPeriod = new Date(year, month, 1, 0, 0, 0);
        const endPeriod = new Date(year, month, AppISetting.nbDayByMonth(year, month), 0, 0, 0);

        let yearMonth = '';
        if (month + 1 < 10) {
            yearMonth = year.toString() + '-0' + (month + 1).toString();
        } else {
            yearMonth = year.toString() + '-' + (month + 1).toString();
        }

        const labelYearMonth = months[month] + '   ' + year.toString();
        const labelMonth = months[month] + ' ' + year.toString().substr(2, 4);
        const nbDaysMonth = AppISetting.nbDayByMonth(year, month);
        const nbOpenedMonth = AppISetting.nbOpenedDayByMonth(year, month);

        return new PeriodMonth(year, month, startPeriod, endPeriod, labelYearMonth, labelMonth, yearMonth, nbDaysMonth, nbOpenedMonth);
    }

    public static getPeriodMonthFromS(yearMonth: string): PeriodMonth {

        const year = parseInt(yearMonth.substr(0,4), 10);
        const month = parseInt(yearMonth.substr(5,7), 10)-1;

        const months = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai.', 'Jui.', 'Jul.', 'Aou.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
        const startPeriod = new Date(year, month, 1, 0, 0, 0);
        const endPeriod = new Date(year, month, AppISetting.nbDayByMonth(year, month), 0, 0, 0);

        const labelYearMonth = months[month] + '   ' + year.toString();
        const labelMonth = months[month] + ' ' + year.toString().substr(2, 4);
        const nbDaysMonth = AppISetting.nbDayByMonth(year, month);
        const nbOpenedMonth = AppISetting.nbOpenedDayByMonth(year, month);

        return new PeriodMonth(year, month, startPeriod, endPeriod, labelYearMonth, labelMonth, yearMonth, nbDaysMonth, nbOpenedMonth);
    }
}

export class PeriodMonths {

    public yearMin: number;             // année sur 4 chiffres
    public monthMin: number;            // mois de 0 à 11
    public yearMax: number;             // année sur 4 chiffres
    public monthMax: number;            // mois de 0 à 11

    public startPeriod: Date;
    public endPeriod: Date;

    public labelYearMonth= [];
    public labelMonth = [];
    public yearMonth = [];
    public nbDaysMonth = [];
    public nbOpenedMonth = [];

    // tslint:disable-next-line:max-line-length
    constructor(yearMin: number, monthMin: number, yearMax: number, monthMax: number, startPeriod: Date, endPeriod: Date, labelYearMonth: any[], labelMonth: any[], yearMonth: any[], nbDaysMonth: any[], nbOpenedMonth: any[]) {
        this.yearMin = yearMin;
        this.monthMin = monthMin;
        this.yearMax = yearMax;
        this.monthMax = monthMax;
        this.startPeriod = startPeriod;
        this.endPeriod = endPeriod;
        this.labelYearMonth = labelYearMonth;
        this.labelMonth = labelMonth;
        this.yearMonth = yearMonth;
        this.nbDaysMonth = nbDaysMonth;
        this.nbOpenedMonth = nbOpenedMonth;
    }
}

export class GlobalVariable {
    public lastMonth: Date;
    public nbMonths: number;

    constructor(lastMonth: Date, nbMonths: number) {
        this.lastMonth = lastMonth;
        this.nbMonths = nbMonths;
    }
}
