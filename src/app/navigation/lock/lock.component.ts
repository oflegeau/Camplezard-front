import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lock',
  templateUrl: 'lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit, OnDestroy {
  focus;
  constructor() {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('lock-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lock-page');
  }
}
