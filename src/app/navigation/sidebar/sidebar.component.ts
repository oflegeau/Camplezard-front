import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  smallTitle?: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  smallTitle?: string;
  title?: string;
  type?: string;
}
// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Dashboard',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36 iconBlack',
  },
  {
    path: '/user',
    title: 'UserConnected Profile',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36 iconBlack',
  },
  {
    path: '/members',
    title: 'Ressources',
    type: 'link',
    icontype: 'tim-icons icon-chart-pie-36 iconBlack',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }
}
