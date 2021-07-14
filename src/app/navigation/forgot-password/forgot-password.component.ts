import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../share/guard/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {

  public loginForm: FormGroup;
  public formOk = false;

  public focusTouchedEmail: boolean;
  public focusEmail: boolean;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl({value: '', disabled: false},
          [Validators.required, Validators.email]),
    });
  }

  get email() {return this.loginForm.get('email') as FormControl; }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('forgot-password-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('forgot-password-page');
  }
  onLogin() {
    this.formOk = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.forgotPassword(this.email.value).then();
  }
}
