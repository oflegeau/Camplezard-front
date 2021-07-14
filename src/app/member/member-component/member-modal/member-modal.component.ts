import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {MemberCard} from '../../../share/back-model/MemberCard';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit, OnDestroy {

  private eventsSubscription: Subscription;
  private member: MemberCard;
  @Input() events: Observable<MemberCard>;
  @Output() createMember: EventEmitter<MemberCard> = new EventEmitter<MemberCard>();
  @Output() changeMember: EventEmitter<MemberCard> = new EventEmitter<MemberCard>();

  types = [
    { id: 0, name: 'France' },
    { id: 1, name: 'Espagne' },
    { id: 2, name: 'Angleterre' },
    { id: 3, name: 'Allemagne' },
    { id: 4, name: 'Autres' }
  ];
  private typeSelected: number;

  @ViewChild('childModalMember', { static: false }) childModalMember: ModalDirective;

  public formMember: FormGroup;
  public formMemberOk = false;
  public formMemberCreate = false;

  public focusTouchedName: boolean;
  public focusTouchedSurname: boolean;
  public focusTouchedCreation: boolean;
  public focusTouchedType: boolean;

  public focusName: boolean;
  public focusSurname: boolean;
  public focusCreation: boolean;

  public image : string;
  private imageChange : boolean;
  public minDateStart = new Date(2021, 0, 1);

  // données graphiques
  datePickerValue: Date = new Date(2021, 0);
  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  minDate = new Date(1990, 0, 1);
  maxDate = new Date();
  private yearDiploma: string;

  constructor() {
    this.typeSelected = 2;

    this.member = null;
    this.eventsSubscription = null;

    this.yearDiploma = '';
    this.image = '';
    this.imageChange = false;

    this.bsConfig = Object.assign({}, {
      isAnimated: true,
      containerClass: 'theme-green',
      dateInputFormat: 'YYYY',
      minMode : this.minMode,
    });

    this.formMember = new FormGroup({
      type: new FormControl({value: null, disabled: false}, Validators.required),
      creation: new FormControl({value: new Date(), disabled: false}, Validators.required),
      name: new FormControl({value: '', disabled: false},
          [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z -àéèêëëêäâô]*')]),
      surname: new FormControl({value: '', disabled: false},
          [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern('[a-zA-Z -àéèêëêäâô]*')]),
    });

    this.type.valueChanges.subscribe((value) => {
      if (this.typeSelected !== value) {
        this.focusTouchedType = true;
      }
      this.typeSelected = value;
    });
  }

  get type() {return this.formMember.get('type') as FormControl; }
  get creation() {return this.formMember.get('creation') as FormControl; }
  get name() {return this.formMember.get('name') as FormControl; }
  get surname() {return this.formMember.get('surname') as FormControl; }

  /*--------------------------------------------------------------------*/
  /*                     Init                                           */
  /*--------------------------------------------------------------------*/

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((data) => {
      this.member = data;
      if (this.member) {
        this.change();
      } else  {
        this.add();
      }
    });
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  /*--------------------------------------------------------------------*/

  getOutputPhoto(event) {
    this.image = event;
    this.imageChange = true;
  }

  /*--------------------------------------------------------------------*/

  add() {
    this.formMemberOk = false;
    this.formMemberCreate = true;

    this.focusTouchedName= false;
    this.focusTouchedSurname= false;
    this.focusTouchedCreation= false;
    this.focusTouchedType= false;
    this.focusName= false;
    this.focusSurname= false;
    this.focusCreation= false;

    this.name.setValue('');
    this.surname.setValue('');
    this.creation.setValue(new Date());
    this.type.setValue(1);
    this.typeSelected = 1;
    this.image  =  '';

    this.minDateStart = new Date(2017, 0, 1);

    this.childModalMember.show();
  }

  submitCreate () {
    this.formMemberOk = true;

    // stop here if form is invalid
    if (this.formMember.invalid) {
      return;
    }
    this.createMember.emit(new MemberCard('',
                                          this.name.value,
                                          this.surname.value,
                                          this.image,
                                          new Date(this.creation.value),
                                          false,
                                          '',
                                          '',
                                          this.typeSelected,
                                         null,
                                         false,
                                          '',
                                          '',
                                          ''));
    this.childModalMember.hide();
  }

  /*--------------------------------------------------------------------*/

  change() {
    this.formMemberOk = false;
    this.formMemberCreate = false;

    this.focusTouchedName= false;
    this.focusTouchedSurname= false;
    this.focusTouchedCreation= false;
    this.focusTouchedType= false;
    this.focusName= false;
    this.focusSurname= false;
    this.focusCreation= false;

    this.name.setValue(this.member.name);
    this.surname.setValue(this.member.surname);
    this.creation.setValue(new Date(this.member.created));

    this.minDateStart = new Date(2017, 0, 1);

    this.image  = this.member.photo;
    this.childModalMember.show();
  }

  submitChange() {
    this.formMemberOk = true;
    let change = false;

    // stop here if form is invalid
    if (this.formMember.invalid) {
      return;
    }

    if (this.imageChange === true) {
      this.member.photo = this.image;
      change = true;
    }

    if (this.type.dirty || this.type.touched) {
      this.member.nation = this.typeSelected;
      change = true;
    }

    if (this.name.dirty || this.name.touched) {
      this.member.name = this.name.value;
      change = true;
    }
    if (this.surname.dirty || this.surname.touched) {
      this.member.surname = this.surname.value;
      change = true;
    }
    if (this.creation.dirty || this.creation.touched) {
      this.member.created = new Date(this.creation.value);
      change = true;
    }
    if (change === true) {
      this.changeMember.emit(this.member);
      this.childModalMember.hide();
    }
  }
}
