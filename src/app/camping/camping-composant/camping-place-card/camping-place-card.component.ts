import {Component, Input, OnChanges} from '@angular/core';
import {Place} from '../../../share/back-model/Place';

@Component({
  selector: 'app-camping-place-card',
  templateUrl: './camping-place-card.component.html',
  styleUrls: ['./camping-place-card.component.scss']
})
export class CampingPlaceCardComponent implements OnChanges {

  @Input() place: Place;
  public now = new Date();

  constructor() {
    this.place = null;
  }

  ngOnChanges() {
  }
}
