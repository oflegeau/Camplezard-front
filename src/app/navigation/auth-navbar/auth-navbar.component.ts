import {Component, Input, OnInit} from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../../share/guard/auth.service';

const misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss']
})
export class AuthNavbarComponent implements OnInit {
  isCollapsed = true;
  private listTitles: any[];
  location: Location;

  @Input() floating: boolean;

  constructor(location: Location,
              private authService: AuthService,
              public toastr: ToastrService) {
    this.location = location;
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

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.split('/')[2];

    for (let i = 0; i < this.listTitles.length; i++) {
      if (this.listTitles[i].type === 'sub') {
        for (let j = 0; j < this.listTitles[i].children.length; j++) {
          if (this.listTitles[i].children[j].path === titlee) {
            return this.listTitles[i].children[j].title;
          }
        }
      }
    }

    return 'app Web App';
  }
}
