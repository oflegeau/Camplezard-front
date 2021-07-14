import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../share/guard/auth.service';

@Component({
  selector: 'app-home-verified',
  templateUrl: './home-verified.component.html',
  styleUrls: ['./home-verified.component.scss']
})
export class HomeVerifiedComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('home-user-verified');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('home-user-verified');
  }
}

