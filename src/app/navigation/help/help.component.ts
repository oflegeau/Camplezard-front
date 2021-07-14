import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public canvas: any;
  public ctx;

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('myCamp');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.rect(20, 20, 150, 100);
    this.ctx.stroke();
  }
}
