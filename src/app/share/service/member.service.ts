import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MemberRestService} from '../rest/member.rest.service';
import {AuthService} from '../guard/auth.service';
import {Router} from '@angular/router';
import {MemberResa} from '../back-model/Member';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AppISetting} from '../interface/app.interface.setting';
import {Reponse} from '../back-model/Reponse';

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    private object: MemberResa;
    private obs: BehaviorSubject<MemberResa>;

    constructor(private memberRestService: MemberRestService,
                private authService: AuthService,
                private router: Router) {
        this.object = null;
        this.obs = new BehaviorSubject<MemberResa>(this.object);
    }

    // -----------------------------------------------------------------------------  //
    //                                  GET                                           //
    // ------------------------------------------------------------------------------ //

    public get_obs(id: string): Observable<MemberResa> {
        this.memberRestService.get_MemberResa(id).subscribe(
            (data: HttpResponse<MemberResa>) => {
                if (data.ok && data.status === AppISetting.HTTP_OK) {
                    this.object = data.body;
                    this.obs.next(this.object);
                }
            },
            (err: HttpErrorResponse) => {
                if (err.ok === false) { switch (err.status) {
                    case AppISetting.HTTP_NOTFOUND:   this.router.navigate(['/full/not-found']); break;
                    case AppISetting.HTTP_FORBIDDEN:  this.router.navigate(['/full/forbidden']); break;
                    case AppISetting.HTTP_UNAUTHORIZED: this.authService.signOut(); break;
                    default: if (err.error) {console.log(err.error.message); } break;
                }} else {console.log('Pb HTTP REST'); }});
        return this.obs.asObservable();
    }

    public get_prom(id: string): Promise<MemberResa> {
        return new Promise((resolve, reject) => {
            this.memberRestService.get_MemberResa(id).subscribe(
                (data: HttpResponse<MemberResa>) => {
                    if (data.ok && data.status === AppISetting.HTTP_OK) {
                        this.object = data.body;
                        this.obs.next(this.object);
                        resolve(this.object);
                    }
                },
                (err: HttpErrorResponse) => {
                    let error = '';
                    if (err.ok === false) { switch (err.status) {
                        case AppISetting.HTTP_NOTFOUND:   this.router.navigate(['/full/not-found']); break;
                        case AppISetting.HTTP_FORBIDDEN:  this.router.navigate(['/full/forbidden']); break;
                        case AppISetting.HTTP_UNAUTHORIZED: this.authService.signOut(); break;
                        default: if (err.error) {console.log(error = err.error.message); } break;
                    }} else {console.log('Pb HTTP REST'); }
                    reject(new Reponse(false, error, 0, '', 0));
                });
        });
    }

    // -----------------------------------------------------------------------------  //
    //                                  DELETE                                        //
    // ------------------------------------------------------------------------------ //

    delete(id: string): Promise<Reponse> {
        return new Promise((resolve, reject) => {
            this.memberRestService.delete(id).subscribe(
                (data: HttpResponse<Reponse>) => {
                    if (data.ok && data.status === AppISetting.HTTP_OK && data.body.ids === id) {

                        // pas de push local car relance du serveur OBLIGATOIRE / pagination
                        resolve(new Reponse(true, '', 0, '', 0));
                    } else if (data.ok && data.status === AppISetting.HTTP_NON_AUTHORITATIVE_INFORMATION) {

                        // pas de push local car relance du serveur OBLIGATOIRE / pagination
                        resolve(new Reponse(false, '', data.body.code, '', 0));
                    } else {
                        resolve(new Reponse(false, '!HTTP_OK DELETEE', 0, '', 0));
                    }
                },
                (err: HttpErrorResponse) => {
                    let error = '';
                    if (err.ok === false) {
                        switch (err.status) {
                            case AppISetting.HTTP_NOTFOUND:
                                this.router.navigate(['/full/not-found']);
                                break;
                            case AppISetting.HTTP_FORBIDDEN:
                                this.router.navigate(['/full/forbidden']);
                                break;
                            case AppISetting.HTTP_UNAUTHORIZED:
                                this.authService.signOut();
                                break;
                            default:
                                if (err.error) {
                                    console.log(error = err.error.message);
                                }
                                break;
                        }
                    } else {
                        console.log('Pb HTTP REST');
                    }
                    reject(new Reponse(false, error, 0, '', 0));
                });
        });
    }
}
