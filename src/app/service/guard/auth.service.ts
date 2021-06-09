import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Connect} from '../model/Connect';
import {AppISetting} from '../../app.interface.setting';
import {ToastrService} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import {ConnectRestService} from '../rest/connect.rest.service';
import {Reponse} from '../model/Reponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;

  private user: Connect;
  private obs: BehaviorSubject<Connect>;

  constructor(private connectRestService: ConnectRestService,
              private toastrService: ToastrService,
              private router: Router,
              private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    this.user = null;
    this.obs = new BehaviorSubject<Connect>(this.user);
  }

  // ---------------------------------------------------------------------------------------- //

  getUser(): Observable<Connect> {
    return this.obs.asObservable();
  }

  // ---------------------------------------------------------------------------------------- //

  getId(): string {
    return localStorage.getItem('password');
  }

  setId(id: string) {
    localStorage.setItem('password', id);
  }

  getLogin(): string {
    return localStorage.getItem('login');
  }

  setLogin(idToken: string) {
    localStorage.setItem('login', idToken);
  }

  getRole(): number {
    return parseInt(localStorage.getItem('role'), 10);
  }

  setrole(role: number) {
    if (role > 0) {
      localStorage.setItem('role', role.toString());
    } else {
      localStorage.setItem('role', '0');
    }
  }

  // ---------------------------------------------------------------------------------------- //
  // FIREBASE CLIENT FUNCTIONS
  // ---------------------------------------------------------------------------------------- //

  isSignInAccount(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.authState.subscribe(
        (user) => {
          if (user) {
            if (user.displayName !== null) {
              user.getIdToken(true).then(idToken => {
                this.updateAccount(idToken, user.displayName).then(
                    () => {
                      resolve(true);
                    }, () => {
                      this.user = null;
                      this.router.navigate(['/fullscreen/login']);
                      reject(false);
                    });
              });
            }
          } else {
            this.router.navigate(['/fullscreen/login']);
            reject(false);
          }
      });
    });
  }

  // ----------------------------------- //

  signInAccount(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signOutAccount() {
    this.setLogin('');
    this.setId('');
    this.setrole(0);
    this.user = null;
    this.obs.next(this.user);

    this.angularFireAuth.signOut().then(r => this.router.navigate(['/fullscreen/login']));
  }

  // ---------------------------------------------------------------------------------------- //
  // CONNECT FUNCTIONS
  // ---------------------------------------------------------------------------------------- //

  createAccount(email: string, password: string, name: string, surname: string, phone: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
        (data) => {
          this.user = null;
          data.user.getIdToken().then(
            (idToken) => {
              this.connectRestService.create(idToken, name, surname, phone).subscribe(
                (data1: HttpResponse<Reponse>) => {
                  if (data1.ok && data1.status === AppISetting.HTTP_CREATED) {
                    resolve(data1.body.ids);
                  }
                },
                (err: HttpErrorResponse) => {
                  if (err.status === AppISetting.HTTP_FORBIDDEN) {
                    this.router.navigate(['/fullscreen/forbidden']);
                  } else if (err.status === AppISetting.HTTP_UNAUTHORIZED) {
                    this.signOutAccount();
                  } else {
                    console.log(err.error.message);
                    reject(err.error.httpMessage);
                  }
                });
            },
            (error) => reject(error));
        }, (res) => reject(res));
    });
  }

  updateAccount(idToken: string, id: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.connectRestService.getConnect(idToken, id).subscribe(
        (data: HttpResponse<Connect>) => {
          if (data.ok && data.status === AppISetting.HTTP_OK) {
            this.setLogin(idToken);
            this.setId(id);
            this.setrole(data.body.role);
            this.user = data.body;
            this.obs.next(this.user);
            resolve(true);
          } else {
            if (data.ok && data.status === AppISetting.HTTP_NOTFOUND) {
              this.setLogin('');
              this.setId('');
              this.setrole(0);
              this.user = null;
              this.obs.next(this.user);
              reject(false);
            }
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === AppISetting.HTTP_FORBIDDEN) {
            this.router.navigate(['/fullscreen/forbidden']);
          } else if (err.status === AppISetting.HTTP_UNAUTHORIZED) {
            this.signOutAccount();
          } else {
            this.showSidebarMessage('le serveur est arrêté !');
            console.log(err.error.message);
            reject(err.error.httpMessage);
          }
        });
    });
  }

  showSidebarMessage(message) {
    this.toastrService.show(
        '<span class="now-ui-icons ui-1_bell-53"></span>',
        message,
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: 'alert alert-danger alert-with-icon',
          positionClass: 'toast-top-right'
        }
    );
  }
}
