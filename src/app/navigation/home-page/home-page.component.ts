import {Component, OnDestroy, OnInit} from '@angular/core';
import {Connect} from '../../share/back-model/Connect';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit , OnDestroy {

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
