import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../guard/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AppISetting} from '../interface/app.interface.setting';
import {Reponse} from '../back-model/Reponse';
import {PlaceSlot} from '../back-model/Place';
import {PlaceRestService} from '../rest/place.rest.service';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {

    private object: PlaceSlot;
    private obs: BehaviorSubject<PlaceSlot>;

    constructor(private placeRestService: PlaceRestService,
                private authService: AuthService,
                private router: Router) {
        this.object = null;
        this.obs = new BehaviorSubject<PlaceSlot>(this.object);
    }

    // -----------------------------------------------------------------------------  //
    //                                  GET                                           //
    // ------------------------------------------------------------------------------ //

    public get_obs(id: string): Observable<PlaceSlot> {
        this.placeRestService.get_PlaceSlot(id).subscribe(
            (data: HttpResponse<PlaceSlot>) => {
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

    public get_prom(id: string): Promise<PlaceSlot> {
        return new Promise((resolve, reject) => {
            this.placeRestService.get_PlaceSlot(id).subscribe(
                (data: HttpResponse<PlaceSlot>) => {
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
}
