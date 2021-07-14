import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import swal from 'sweetalert2';
import {DeleteConfirmation} from '../../front-model/DeleteConfirmation';

@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})
export class ModalConfirmDeleteComponent implements OnInit, OnDestroy {

  public deleteConfirmation: DeleteConfirmation;
  private eventsSubscription: Subscription;
  @Input() events: Observable<DeleteConfirmation>;
  @Output() confirmation: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('childModalDelete', { static: false }) childModalDelete: ModalDirective;

  constructor() {
    this.deleteConfirmation = null;
  }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.deleteConfirmation = data;
      this.childModalDelete.show();
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onConfirm() {

    if (this.deleteConfirmation.isCertified) {
      // @ts-ignore
      swal.fire({
            title:
                '<div style="font-size:18px;font-weight:normal;color: #FFFFFF">Confirmer la suppression: saisir "Effacer"</div>',
            html:
                '<div class="form-group" style="font-size:18px;font-weight:normal;background: #f07148">' +
                '<input id="input-field" type="text" class="form-control" style="color: #FFFFFF; border: #f07148"/>' +
                '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-danger mr-1',
            confirmButtonText:
                '<div style="font-size:16px;">Supprimer</div>',
            confirmButtonColor: '#f07148',
            cancelButtonClass: 'btn btn-danger',
            cancelButtonText: '<div style="font-size:16px;">Annuler</div>',
            cancelButtonColor: '#f07148',
            background: '#32384D',
          })
          .then((rep) => {
            if (rep.value === true) {
              if ((document.getElementById('input-field') as HTMLInputElement).value === 'Effacer') {
                this.confirmation.emit(this.deleteConfirmation.returnCode);
              } else {
                swal.fire({
                  title:
                      '<div style="font-size:18px;font-weight:normal;color: #f07148">Suppression annulée !</div>',
                  text: 'Vous n\'avez pas taper "Effacer"',
                  timer: 2000,
                  showConfirmButton: false
                });
              }
            }
          });
    } else {
      this.confirmation.emit(this.deleteConfirmation.returnCode);
    }
  }
}
