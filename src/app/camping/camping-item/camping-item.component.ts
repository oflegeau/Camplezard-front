import { Component, OnInit } from '@angular/core';
import {CalendarDate, CalendarDateEvent, CalendarDay, CalendarDayEvent} from '../../share/front-model/CalendarDate';
import {AppISetting} from '../../share/interface/app.interface.setting';
import {PeriodMonth} from '../../share/front-model/GlobalVariable';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-camping-item',
  templateUrl: './camping-item.component.html',
  styleUrls: ['./camping-item.component.scss',
    '../../share/css/calendar.scss',
    '../../share/css/gantt.scss']
})
export class CampingItemComponent implements OnInit {

  // gestion de la période //
  public periodMonth: PeriodMonth;
  public selectedIPlace: string;

  // données principales de la page
  calendarDates: CalendarDate[];
  calendarDays: CalendarDay[];

  constructor( private route: ActivatedRoute,
               private router: Router) {
    this.calendarDates = new Array<CalendarDate>();
    this.calendarDays = new Array<CalendarDay>();
  }

  /*--------------------------------------------------------------------*/
  /*                     Init                                           */
  /*--------------------------------------------------------------------*/

  getNbSlots(fte: number): number {
    switch (fte) {
      case 25:  return 1;
      case 50:  return 2;
      case 75:  return 3;
      case 100: return 4;
      case 125: return 5;
      case 150: return 6;
      case 175: return 7;
      case 200: return 8;
      case 225: return 9;
      case 250: return 10;
      case 275: return 11;
      case 300: return 12;
      default: return 0;
    }
  }

  /*--------------------------------------------------------------------*/

  async ngOnRefresh() {

   this.calendarDates.splice(0,  this.calendarDates.length);
   this.calendarDays.splice(0,  this.calendarDays.length);
   this.calendarDates = CalendarDate.getCalendaMonth(this.periodMonth.year, this.periodMonth.month,0);
  }

  ngOnInit() {
    this.selectedIPlace = this.route.snapshot.params.id;
    this.periodMonth = PeriodMonth.getPeriodMonthFromS(this.route.snapshot.params.yearmonth);

    this.ngOnRefresh();
  }

}
