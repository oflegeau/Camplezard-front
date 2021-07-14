import {Component, OnInit, ElementRef, OnDestroy, Input, TemplateRef} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {AuthService} from '../../share/guard/auth.service';
import {Subscription} from 'rxjs';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {BsModalService} from 'ngx-bootstrap';
import {Connect} from '../../share/back-model/Connect';
import {AppIBreadCrumb} from '../../share/interface/app.interface.breadcrumb';
import {GlobalVariableService} from '../../share/service/global.variable.service';
import {AppISetting} from '../../share/interface/app.interface.setting';
import {GlobalVariable, PeriodMonths} from '../../share/front-model/GlobalVariable';

const misc: any = {
  sidebar_mini_active: true
};
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public connect: Connect;
  @Input() breadcrumb: AppIBreadCrumb[];

  public globalVariable: GlobalVariable;
  private globalVariableSub: Subscription;
  public periodMonths: PeriodMonths;
  public nbMonths = 12;
  dataPeriod = [12, 9, 6, 3, 1];

  // MODAL DATE
  minDate = new Date(2019, 11, 1);
  maxDate = new Date();
  bsValue = new Date();
  bsConfig: Partial<BsDatepickerConfig>;

  private listTitles: any[];
  location: Location;

  private toggleButton: any;
  public isCollapsed = true;

  public sidebarColor = 'primary';
  public state = true;
  public dashboardColor = true;

  constructor(
      location: Location,
      private element: ElementRef,
      private router: Router,
      public toastr: ToastrService,
      private authService: AuthService,
      private modalService: BsModalService,
      private globalVariableService: GlobalVariableService) {
    this.location = location;
    this.connect = JSON.parse(localStorage.getItem('connect'));

    this.bsConfig = Object.assign({}, {
      isAnimated: true,
      containerClass: 'theme-orange',
      dateInputFormat: 'MM-YYYY',
    });
  }

  ngOnInit() {
    window.addEventListener('resize', this.updateColor);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
    });

    this.globalVariableSub = this.globalVariableService.obs_getObj().subscribe(data => {
      this.globalVariable=data;
      this.nbMonths = this.globalVariable.nbMonths;
      this.periodMonths = this.globalVariableService.getPeriodMonths();
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateColor);
    if (this.globalVariableSub) {
      this.globalVariableSub.unsubscribe();
    }
  }

  /*--------------------------------------------------------------------*/

  onMonths(nb: number) {
    this.globalVariableService.pro_update_PeriodMonth(nb).then();
  }

  onChangeDate(value: Date) {
    const date = value;
    this.globalVariableService.pro_update_LastMonth(new Date(
        date.getFullYear(),
        date.getMonth(),
        AppISetting.nbDayByMonth(date.getFullYear(), date.getMonth()), 23, 59, 59)).then();
  }

  /*--------------------------------------------------------------------*/

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    const navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add('bg-white');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }
  };

  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add('sidebar-mini');
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(()=> {window.dispatchEvent(new Event('resize'));}, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(()=> {clearInterval(simulateWindowResize);}, 1000);
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = (
        document.getElementsByTagName('body')[0]
    ) as HTMLElement;
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      body.style.position = 'fixed';
    }

    setTimeout(()=> {toggleButton.classList.add('toggled');}, 500);

    html.classList.add('nav-open');
    const $layer = document.createElement('div');
    $layer.setAttribute('id', 'bodyClick');


    if (html.getElementsByTagName('body')) {
      document.getElementsByTagName('body')[0].appendChild($layer);
    }
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    $layer.onclick = function() { // asign a function
      html.classList.remove('nav-open');
      setTimeout(()=> {$layer.remove();$toggle.classList.remove('toggled');}, 400);
      const mainPanel =  document.getElementsByClassName('main-panel')[0] as HTMLElement;
      if (window.innerWidth < 991) {setTimeout(()=>{mainPanel.style.position = '';}, 500);}
    }.bind(this);

    html.classList.add('nav-open');
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const body = (
        document.getElementsByTagName('body')[0]
    ) as HTMLElement;

    if (window.innerWidth < 991) {
      setTimeout(()=> {body.style.position = '';}, 500);
    }
    const $layer: any = document.getElementById('bodyClick');
    if ($layer) {
      $layer.remove();

    }
    html.classList.remove('nav-open');
  }

  changeDashboardColor(color) {
    const body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    } else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  onChangeDashboardColor(event) {
    const body = document.getElementsByTagName('body')[0];
    if (this.dashboardColor === true) {
      this.changeDashboardColor('');
    } else {
      this.changeDashboardColor('white-content');
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(()=> {window.dispatchEvent(new Event('resize'));}, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(()=> {clearInterval(simulateWindowResize);}, 1000);
  }

  onChange(event) {
    const body = document.getElementsByTagName('body')[0];
    if (this.state === true) {
      body.classList.remove('sidebar-mini');
    } else {
      body.classList.add('sidebar-mini');
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(()=> {window.dispatchEvent(new Event('resize'));}, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(()=> {clearInterval(simulateWindowResize);}, 1000);
  }
}
