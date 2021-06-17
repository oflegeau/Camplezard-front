import {Component, OnDestroy, OnInit} from '@angular/core';
import {Connect} from '../../service/model/Connect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public connect: Connect;

  constructor() {
    this.connect = JSON.parse(localStorage.getItem('connect'));
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('home-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('home-page');
  }

}
