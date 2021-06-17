import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/guard/auth.service';
import {Connect} from '../../service/model/Connect';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('home-user-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('home-user-page');
  }
}
