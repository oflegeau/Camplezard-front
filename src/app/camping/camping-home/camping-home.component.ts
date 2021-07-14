import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PagePlace} from '../../share/back-model/PagePlace';
import {PlacePageService} from '../../share/service/place.page.service';
import {GlobalVariable, PeriodMonths} from '../../share/front-model/GlobalVariable';
import {GlobalVariableService} from '../../share/service/global.variable.service';

@Component({
  selector: 'app-camping-home',
  templateUrl: './camping-home.component.html',
  styleUrls: ['./camping-home.component.scss']
})
export class CampingHomeComponent implements  OnInit, OnDestroy {

  // gestion de la période glissante //
  public globalVariable: GlobalVariable;
  private globalVariableSub: Subscription;
  public periodMonths: PeriodMonths;
  public nbMonths: number;

  places: PagePlace;
  private subPlaces: Subscription;
  typePlaces: number[] = [0, 1, 2, 3, 4, 5];
  private filterTypeValue: number;

  @ViewChildren('pages') pages: QueryList<any>;
  private numberOfVisiblePaginators = 5;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;

  constructor(private placePageService: PlacePageService,
              private globalVariableService: GlobalVariableService,
              private router: Router,
              private toastrService: ToastrService) {
    this.places = null;
    this.subPlaces = null;

    this.filterTypeValue = 0;
  }

  /*--------------------------------------------------------------------*/
  /*                        INIT                                        */
  /*--------------------------------------------------------------------*/

  onRefresh() {
    this.periodMonths = this.globalVariableService.getPeriodMonths();
    this.nbMonths = this.globalVariable.nbMonths;
    if (this.activePage > 0) {
      this.placePageService.obs_getPage(this.activePage-1);
    }
  }

  ngOnInit() {
    if (this.activePage > 0) {

      this.subPlaces = this.placePageService.obs_getPage(this.activePage-1).subscribe(data => {
        if (data) {
          this.places = data;
          if (this.places.totalPage !== this.numberOfPaginators) {
            this.initPaginators();
          }
          }
        }, error => console.log(error),
          () => console.log('complete places'));
    }

    // variable de période glissante /
    this.globalVariableSub = this.globalVariableService.obs_getObj().subscribe(data => {
      this.globalVariable=data;
      this.onRefresh();
    });
  }

  ngOnDestroy(): void {
    if (this.subPlaces) {
      this.subPlaces.unsubscribe();
    }
    if (this.globalVariableSub) {
      this.globalVariableSub.unsubscribe();
    }
  }

  /*--------------------------------------------------------------------*/

  onTypePlace(i: number) {
    this.filterTypeValue = i;

  }

  /*--------------------------------------------------------------------*/
  /*                           PAGINATION                               */
  /*--------------------------------------------------------------------*/

  initPaginators() {
    this.activePage = 1;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    this.numberOfPaginators = this.places.totalPage;

    this.paginators.splice(0, this.paginators.length);
    for (let i = 1; i <= this.numberOfPaginators; i++) {
      this.paginators.push(i);
    }
  }

  changePage(event: any) {
    if (event.target.text !=='undefined' && event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.onRefresh();
    }
  }

  nextPage() {
    if (this.activePage < this.numberOfPaginators) {
      if ((typeof this.pages.last !== 'undefined') && (this.pages.last.nativeElement.classList.contains('active'))) {
        if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
          this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator += this.numberOfVisiblePaginators;
        } else {
          this.firstVisiblePaginator += this.numberOfVisiblePaginators;
          this.lastVisiblePaginator = this.numberOfPaginators;
        }
      }

      this.activePage += 1;
      this.onRefresh();
    }
  }

  previousPage() {
    if (this.activePage > 1) {
      if ((typeof this.pages.first !== 'undefined') && (this.pages.first.nativeElement.classList.contains('active'))) {
        if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators) {
          this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
          this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
        } else {
          this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
          this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
        }
      }

      this.activePage -= 1;
      this.onRefresh();
    }
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;

    this.onRefresh();
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }

    this.onRefresh();
  }
}
