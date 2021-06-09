import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppISetting} from '../../app.interface.setting';
import {GlobalVariable, PeriodMonths} from '../model/GlobalVariable';

@Injectable({
    providedIn: 'root'
})
export class GlobalVariableService {

    private object: GlobalVariable;
    private obs: BehaviorSubject<GlobalVariable>;

    constructor() {
        this.object = new GlobalVariable(new Date(), 12);
        this.obs = new BehaviorSubject<GlobalVariable>(this.object);
    }

    // -----------------------------------------------------------------------------  //
    //                                  GET                                           //
    // ------------------------------------------------------------------------------ //

    public obs_getObj(): Observable<GlobalVariable> {
        return this.obs.asObservable();
    }

    public getPeriodMonths() : PeriodMonths {

        const months = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai.', 'Jui.', 'Jul.', 'Aou.', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
        const nbMonthsPeriod = this.object.nbMonths;
        const yearMax = this.object.lastMonth.getFullYear();
        const monthMax = this.object.lastMonth.getMonth();
        let yearMin = yearMax;
        let monthMin = monthMax;

        const year = [];
        const month = [];
        let nbMonths = nbMonthsPeriod;
        while (nbMonths > 0) {
            year[nbMonths - 1] = yearMin;
            month[nbMonths - 1] = monthMin;
            if (nbMonths > 1) {
                if (monthMin === 0) {
                    yearMin--;
                    monthMin = 11;
                } else {
                    monthMin--;
                }
            }
            nbMonths--;
        }
        const labelYearMonth= [];
        const labelMonth = [];
        const yearMonth = [];
        const nbDaysMonth = [];
        const nbOpenedMonth = [];

        for (let i=0; i < nbMonthsPeriod; i++) {
            labelYearMonth[i] = months[month[i]] + '   ' + year[i].toString();
            labelMonth[i] = months[month[i]] + ' ' + year[i].toString().substr(2,4);

            if (month[i] + 1 < 10) {
                yearMonth[i] = year[i].toString() + '-0' + (month[i] + 1).toString();
            } else {
                yearMonth[i] = year[i].toString() + '-' + (month[i] + 1).toString();
            }
            nbDaysMonth[i] = AppISetting.nbDayByMonth(year[i], month[i]);
            nbOpenedMonth[i] = AppISetting.nbOpenedDayByMonth(year[i], month[i]);
        }
        const startPeriod = new Date(yearMin, monthMin, 1, 0, 0, 0);
        const endPeriod = new Date(yearMax, monthMax, AppISetting.nbDayByMonth(yearMax, monthMax), 0, 0, 0);

        return new PeriodMonths(yearMin,
                                monthMin,
                                yearMax,
                                monthMax,
                                startPeriod,
                                endPeriod,
                                labelYearMonth,
                                labelMonth,
                                yearMonth,
                                nbDaysMonth,
                                nbOpenedMonth);
    }

    // -----------------------------------------------------------------------------  //
    //                                  UPDATE                                        //
    // ------------------------------------------------------------------------------ //

    pro_update_PeriodMonth(periodMonth: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.object.nbMonths = periodMonth;

            const now = new Date();
            this.object.lastMonth = new Date(now.getFullYear(), now.getMonth(),
                AppISetting.nbDayByMonth(now.getFullYear(), now.getMonth()), 23, 59, 59);
            this.obs.next(this.object);
            resolve(true);
        });
    }

    pro_update_LastMonth(lastMonth: Date): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.object.lastMonth = lastMonth;
            this.obs.next(this.object);
            resolve(true);
        });
    }
}
