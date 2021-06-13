import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/guard/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AppISetting} from '../../app.interface.setting';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public formOk = false;
  public isProcessed = false;

  public focusTouchedName: boolean;
  public focusTouchedSurname: boolean;
  public focusTouchedPhone: boolean;
  public focusTouchedEmail: boolean;
  public focusTouchedPassword: boolean;
  public focusTouchedPassword1: boolean;

  public focusName: boolean;
  public focusSurname: boolean;
  public focusPhone: boolean;
  public focusEmail: boolean;
  public focusPassword: boolean;
  public focusPassword1: boolean;

  constructor(private authService: AuthService,
              private toastService: ToastrService,
              private router: Router) {
    this.isProcessed = false;
    this.loginForm = new FormGroup({
      actionDone: new FormControl({value: false, disabled: false}),
      name: new FormControl({value: '', disabled: false},
                            [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(20),
                              Validators.pattern('[a-zA-Z0-9 _-]*')]),
      surname: new FormControl({value: '', disabled: false},
                            [Validators.required,
                              Validators.minLength(3),
                              Validators.maxLength(20),
                              Validators.pattern('[a-zA-Z0-9 _-]*')]),
      phone: new FormControl({value: '', disabled: false},
                                [Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(14),
                                  Validators.pattern('[0-9 ]*')]),
      password: new FormControl({value: '', disabled: false},
                              [Validators.required,
                                Validators.minLength(6),
                                Validators.pattern('[a-zA-Z0-9 _%-]*')]),
      password1: new FormControl({value: '', disabled: false},
          [Validators.required,
            Validators.minLength(6),
            Validators.pattern('[a-zA-Z0-9 _%-]*')]),
      email: new FormControl({value: '', disabled: false},
          [Validators.required, Validators.email]),
    });
  }

  get name() {return this.loginForm.get('name') as FormControl; }
  get surname() {return this.loginForm.get('surname') as FormControl; }
  get phone() {return this.loginForm.get('phone') as FormControl; }
  get email() {return this.loginForm.get('email') as FormControl; }
  get password() {return this.loginForm.get('password') as FormControl; }
  get password1() {return this.loginForm.get('password1') as FormControl; }
    get actionDone() {return this.loginForm.get('actionDone') as FormControl; }

  ngOnInit() {
    this.isProcessed = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
  }

  onLogin() {
    this.formOk = true;
    this.isProcessed = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    if (this.password1.value === this.password.value) {
        if (this.actionDone.value === true) {
            this.authService.signUp(this.email.value, this.password.value, this.name.value, this.surname.value, this.phone.value)
                .then((result) => {
                    if (result) {
                        this.authService.sendVerificationMail();
                        this.isProcessed = false;
                    } else {
                        this.isProcessed = false;
                    }
                }, (error) => {
                    this.isProcessed = false;
                });
        } else {
            this.isProcessed = false;
            this.toastService.warning('<span class=" tim-icons icon-trash-simple"></span>Vous devez accepter les conditions', 'Attention',
                AppISetting.toastOptions);
        }
    } else {
        this.isProcessed = false;
        this.toastService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Les mots de passes divent être identiques',
            'Erreur', AppISetting.toastOptions);
    }
  }
}
