import {Component, Input, OnChanges} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {PeriodMonths} from '../../front-model/GlobalVariable';
import {GlobalVariableService} from '../../service/global.variable.service';
import {AppISetting} from '../../interface/app.interface.setting';

@Component({
  selector: 'app-control-period',
  templateUrl: './control-period.component.html',
  styleUrls: ['./control-period.component.scss']
})
export class ControlPeriodComponent implements OnChanges {

  @Input() periodMonths: PeriodMonths;
  @Input() nbMonths: number;

  constructor(private toastrService: ToastrService,
              private globalVariableService: GlobalVariableService) {
    this.periodMonths = null;
  }

  ngOnChanges() {
  }

  onMonthLess() {
    if (((this.periodMonths.monthMax === 11) && (this.periodMonths.yearMax === 2019) && (this.nbMonths === 12)) ||
        ((this.periodMonths.monthMax === 8) && (this.periodMonths.yearMax === 2019) && (this.nbMonths === 9)) ||
        ((this.periodMonths.monthMax === 5) && (this.periodMonths.yearMax === 2019) && (this.nbMonths === 6)) ||
        ((this.periodMonths.monthMax === 2) && (this.periodMonths.yearMax === 2019) && (this.nbMonths === 3)) ||
        ((this.periodMonths.monthMax === 0) && (this.periodMonths.yearMax === 2019) && (this.nbMonths === 1))) {
      this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Limite de temps atteinte',
          'Erreur', AppISetting.toastOptions);
    } else if (this.periodMonths.monthMax !== 0) {
      this.periodMonths.monthMax -= 1;
      this.globalVariableService.pro_update_LastMonth(new Date(this.periodMonths.yearMax,
          this.periodMonths.monthMax,
          AppISetting.nbDayByMonth(this.periodMonths.yearMax, this.periodMonths.monthMax), 23, 59, 59)).then();
    } else {
      this.periodMonths.monthMax = 11;
      this.periodMonths.yearMax -= 1;
      this.globalVariableService.pro_update_LastMonth(new Date(this.periodMonths.yearMax,
          this.periodMonths.monthMax,
          AppISetting.nbDayByMonth(this.periodMonths.yearMax, this.periodMonths.monthMax), 23, 59, 59)).then();
    }
  }

  onMonthMore() {
    if ((this.periodMonths.yearMax === new Date().getFullYear()) &&
        (this.periodMonths.monthMax === new Date().getMonth())) {
    } else {
      if (this.periodMonths.monthMax !== 11) {
        this.periodMonths.monthMax += 1;
        this.globalVariableService.pro_update_LastMonth(new Date(this.periodMonths.yearMax,
            this.periodMonths.monthMax,
            AppISetting.nbDayByMonth(this.periodMonths.yearMax, this.periodMonths.monthMax), 23, 59, 59)).then();
      } else {
        this.periodMonths.monthMax = 0;
        this.periodMonths.yearMax += 1;
        this.globalVariableService.pro_update_LastMonth(new Date(this.periodMonths.yearMax,
            this.periodMonths.monthMax,
            AppISetting.nbDayByMonth(this.periodMonths.yearMax, this.periodMonths.monthMax), 23, 59, 59)).then();
      }
    }
  }
}
