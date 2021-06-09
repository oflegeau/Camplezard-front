import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../service/guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public login = false;
  public focusTouched;
  public focusTouched1;

  constructor(private authService: AuthService,
              private toastService: ToastrService,
              private router: Router,
              public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginF() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  onLogin() {
    this.login = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.signInAccount(this.loginForm.value.email, this.loginForm.value.password).then(
        () => {
          this.router.navigate(['/']);
          this.toastService.success('vous êtes identifié !');
        },
        (res) => {
          this.toastService.error(res);
        });

    // POUR INIT
    /*    this.authService.createAccount('xavier.flegeau@gmail.com', 'xav1102%', 'Flegeau', 'Xavier', '06 73 81 06 16').then(
            (result) => {
              this.authService.signOutAccount();
            }, (res) => {
              this.toastService.error(res);
            });
     */
  }
}
