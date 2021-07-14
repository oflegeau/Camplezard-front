import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../share/guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public formOk = false;

  public focusTouchedEmail: boolean;
  public focusTouchedPassword: boolean;

  public focusEmail: boolean;
  public focusPassword: boolean;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      password: new FormControl({value: '', disabled: false},
          [Validators.required,
            Validators.minLength(6),
            Validators.pattern('[a-zA-Z0-9 _%-]*')]),
      email: new FormControl({value: '', disabled: false},
          [Validators.required, Validators.email]),
    });
  }

  get email() {return this.loginForm.get('email') as FormControl; }
  get password() {return this.loginForm.get('password') as FormControl; }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  onLogin() {
    this.formOk = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signIn(this.email.value, this.password.value).then();
  }
}
