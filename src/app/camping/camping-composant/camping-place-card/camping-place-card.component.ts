import {Component, Input, OnChanges} from '@angular/core';
import {Place, PlaceCard} from '../../../share/back-model/Place';

@Component({
  selector: 'app-camping-place-card',
  templateUrl: './camping-place-card.component.html',
  styleUrls: ['./camping-place-card.component.scss']
})
export class CampingPlaceCardComponent implements OnChanges {

  @Input() place: PlaceCard;
  public now = new Date();

  public ca: number;
  public cost: number;
  public margin: number;
  public prod: number;

  constructor() {
    this.place = null;
  }

  ngOnChanges() {
      this.ca = 10239;
      this.prod = 233;
  }
}
