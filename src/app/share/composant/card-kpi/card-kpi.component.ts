import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-kpi',
  templateUrl: './card-kpi.component.html',
  styleUrls: ['./card-kpi.component.scss']
})
export class CardKpiComponent implements OnChanges {

  @Input() public icon: string;
  @Input() public iconColor: string;
  @Input() public title: string;
  @Input() public value: string;
  @Input() public iconComment: string;
  @Input() public comment1: string;
  @Input() public comment2: string;

  constructor() {
    this.icon = 'tim-icons icon-chat-33';
    this.iconColor = 'icon-warning';
    this.title = '';
    this.value = ''
    this.iconComment = '';
    this.comment1 = '';
    this.comment2 = '';
  }

  ngOnChanges() {
  }

}
