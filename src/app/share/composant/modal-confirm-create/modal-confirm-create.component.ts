import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {DeleteConfirmation} from '../../front-model/DeleteConfirmation';

@Component({
  selector: 'app-modal-confirm-create',
  templateUrl: './modal-confirm-create.component.html',
  styleUrls: ['./modal-confirm-create.component.scss']
})
export class ModalConfirmCreateComponent implements  OnInit, OnDestroy  {

  public deleteCreation: DeleteConfirmation;
  private eventsSubscription: Subscription;
  @Input() events: Observable<DeleteConfirmation>;
  @Output() confirmation: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('childModalCreate', { static: false }) childModalCreate: ModalDirective;

  constructor() {
    this.deleteCreation = null;
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.deleteCreation = data;
      this.childModalCreate.show();
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onConfirm() {
    this.confirmation.emit(this.deleteCreation.returnCode);
  }
}
