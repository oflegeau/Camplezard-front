import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Connect} from '../model/Connect';
import {AppISetting} from '../../app.interface.setting';
import {ToastrService} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';
import {ConnectRestService} from '../rest/connect.rest.service';
import {Reponse} from '../model/Reponse';

import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  private user: Connect;
  private obs: BehaviorSubject<Connect>;

  constructor(private connectRestService: ConnectRestService,
              private toastrService: ToastrService,
              private router: Router,
              public ngZone: NgZone, // NgZone service to remove outside scope warning
              private angularFireAuth: AngularFireAuth) {
    this.user = null;
    this.userData = null;
    this.obs = new BehaviorSubject<Connect>(this.user);

    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
          localStorage.setItem('user', null);
      }
    });
  }

  // ---------------------------------------------------------------------------------------- //

  getUser(): Observable<Connect> {
    return this.obs.asObservable();
  }

  // ---------------------------------------------------------------------------------------- //

  // Sign in with email/password
  signIn(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.getIdToken(true).then( (reps) => {
                localStorage.setItem('token', reps);
                this.updateUser(result.user).then((rep) => {
                    if (rep === true) {
                        this.toastrService.success('<span class=" tim-icons icon-simple-add"></span>vous êtes identifié !',
                            'Gestion sécurisée des Accès', AppISetting.toastOptions);

                        this.ngZone.run(() => {
                            this.router.navigate(['/app/home']);
                        });
                    } else {
                        console.log('Pb Serveur');
                    }
                }, ((err) => {
                    console.log(err.message);
                }));
            });
        }).catch((error) => {
            console.log('Pb Firebase');
            this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',error.message,
                AppISetting.toastOptions);
        })
  }

  signUp(email: string, password: string, name: string, surname: string, phone: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(
                (data) => {
                    data.user.getIdToken(false).then(
                        (idToken) => {
                            localStorage.setItem('token', idToken);
                            this.connectRestService.create(idToken, name, surname, phone).subscribe(
                                (data1: HttpResponse<Reponse>) => {
                                    if (data1.ok && data1.status === AppISetting.HTTP_CREATED) {
                                        resolve(true);
                                    } else {
                                        reject(false);
                                        this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',
                                            'Retour HTTP incorrect',
                                            AppISetting.toastOptions);
                                    }
                                },
                                (err: HttpErrorResponse) => {
                                    const userConnected = firebase.auth().currentUser;
                                    userConnected.delete().then();
                                    console.log(err.message);
                                    if (err.status === AppISetting.HTTP_FORBIDDEN) {
                                        reject(false);
                                        this.router.navigate(['/forbidden']);
                                    } else if (err.status === AppISetting.HTTP_UNAUTHORIZED) {
                                        reject(false);
                                        this.signOut().then();
                                    } else {
                                        reject(false);
                                        this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',
                                            err.message,
                                            AppISetting.toastOptions);
                                    }
                                });
                        },
                        (error) => {
                            console.log(error.message);
                            reject(false);
                            this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',
                                error.message,
                                AppISetting.toastOptions);
                        });
                }, (error) => {
                    console.log(error.message);
                    reject(false);
                    this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',
                        error.message,
                        AppISetting.toastOptions);
                });
        });
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          this.router.navigate(['/verify-email']);
        })
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
            this.toastrService.success('<span class=" tim-icons icon-simple-add"></span>Mail envoyé ! Vérifiez votre boite mail',
                'Gestion sécurisée des Accès', AppISetting.toastOptions);
        }).catch((error) => {
            this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>',error.message,
                AppISetting.toastOptions);
        })
  }

  updateUser(user): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (user.emailVerified === true) {
                this.connectRestService.getConnect().subscribe(
                    (data: HttpResponse<Connect>) => {
                        if (data.ok && data.status === AppISetting.HTTP_OK) {
                            this.user = data.body;
                            this.obs.next(this.user);
                            resolve(true);
                        } else {
                            if (data.ok && data.status === AppISetting.HTTP_NOTFOUND) {
                                this.user = null;
                                this.obs.next(this.user);

                                this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Le serveur ne répond pas',
                                    'Gestion sécurisée des Accès',
                                    AppISetting.toastOptions);
                                reject(false);
                            }
                        }
                    }, (error => {
                        console.log(error.message);
                        reject(false);
                    }));
            } else {
                resolve(true);
            }
        });
    }

    changePhotoUser(photo : string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const connect = JSON.parse(localStorage.getItem('connect'));
            connect.photo = photo;
            this.connectRestService.update(connect).subscribe((data: HttpResponse<Connect>) => {
                if (data.ok && data.status === AppISetting.HTTP_ACCEPTED) {
                    this.user = data.body;
                    localStorage.setItem('connect', JSON.stringify(this.user));
                    this.obs.next(this.user);
                    resolve(true);
                } else {
                    if (data.ok && data.status === AppISetting.HTTP_NOTFOUND) {
                        this.user = null;
                        localStorage.setItem('connect', null);
                        this.obs.next(this.user);

                        this.toastrService.error('<span class=" tim-icons icon-alert-circle-exc"></span>Le serveur ne répond pas',
                            'Gestion sécurisée des Accès',
                            AppISetting.toastOptions);
                    }
                    resolve(false);
                }
            });
        });
    }

  // Sign out
  signOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('connect');
      localStorage.clear();
      this.router.navigate(['/login']);
    })
  }
}
