import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppIBreadCrumb} from './share/interface/app.interface.breadcrumb';
import {Connect} from './share/back-model/Connect';
import {Member} from './share/back-model/MemberCard';
import {AuthService} from './share/guard/auth.service';
import {MemberListService} from './share/service/member.list.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import {distinctUntilChanged, filter} from 'rxjs/operators';

const misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public breadcrumbs: AppIBreadCrumb[] = [];

  fullPage: boolean;
  floating: boolean;
  private currentUrl = '';

  connect: Connect;

  memberLists: Member[];
  private subMembers: Subscription;

  constructor(private authService: AuthService,
              public router: Router,
              private memberListService: MemberListService,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrService) {
    this.subMembers = null;
    this.memberLists = null;

    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    this.connect = JSON.parse(localStorage.getItem('connect'));

    this.fullPage = true;
    this.floating = true;
    this.router.events.subscribe((route: any) => {
      if (route.routerEvent) {
        this.fullPage = true;
        this.floating = true;
        this.currentUrl = route.routerEvent.url;
        if (this.currentUrl.includes('/app/')) {
          this.fullPage = false;
        }
        if (this.currentUrl.includes('/full/')) {
          this.floating = false;
        }
      }
    });
  }
  @HostListener('window:scroll', ['$event'])
  showNavbarButton = () => {
    const mainPanel: any = document.getElementsByClassName('main-panel')[0];
    const navbarMinimize: any = document.getElementsByClassName('navbar-minimize-fixed')[0];

    if (mainPanel && navbarMinimize) {
      if (
          document.documentElement.scrollTop > 50 ||
          document.scrollingElement.scrollTop > 50 ||
          mainPanel.scrollTop > 50
      ) {
        navbarMinimize.style.opacity = 1;
      } else if (
          document.documentElement.scrollTop <= 50 ||
          document.scrollingElement.scrollTop <= 50 ||
          mainPanel.scrollTop <= 50
      ) {
        navbarMinimize.style.opacity = 0;
      }}
  };

  ngOnInit() {
    const mainPanel: any = document.getElementsByClassName('main-panel')[0];
    const sidebar: any = document.getElementsByClassName('sidebar-wrapper')[0];

    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.className += ' perfect-scrollbar-on';
      document.documentElement.classList.remove('perfect-scrollbar-off');
      // let ps = new PerfectScrollbar(mainPanel);
      let ps = new PerfectScrollbar(sidebar);
      const tables: any = document.querySelectorAll('.table-responsive');
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    this.showNavbarButton();

    if (this.connect && this.connect.role > 1) {
      this.subMembers = this.memberListService.obs_getList().subscribe(data => {
        if (data) {
          this.memberLists = data;
        }
      });
    }

    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd), distinctUntilChanged())
        .subscribe((route: any) => {
          this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
        });
  }

  ngOnDestroy(): void {
    if (this.subMembers) {
      this.subMembers.unsubscribe();
    }

    this.authService.signOut();
  }

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
    const simulateWindowResize = setInterval(()=> {
      window.dispatchEvent(new Event('resize'));}, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(()=> {
      clearInterval(simulateWindowResize);}, 1000);
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: AppIBreadCrumb[] = []): AppIBreadCrumb[] {

    // If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    let type = '';

    // si route dynamique = :id dans l'URL
    if (isDynamicRoute && !!route.snapshot) {
      // remplacer :id par son id en fct Members/Clients/Projects
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      type = label;
      label = route.snapshot.params[paramName];

      switch (type) {
        case 'ItemMember':
          if (this.memberLists) {
            label = this.memberLists.find(data => label === data.id).name;
          } else {
            label = 'Ressource';
          }
          break;
      }
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: AppIBreadCrumb = {
      label,
      url: nextUrl,
    };

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
