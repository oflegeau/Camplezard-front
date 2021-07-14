import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../guard/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AppISetting} from '../interface/app.interface.setting';
import {PagePlace} from '../back-model/PagePlace';
import {PlaceRestService} from '../rest/place.rest.service';

@Injectable({
    providedIn: 'root'
})
export class PlacePageService {

    private obj: PagePlace;
    private obsObj: BehaviorSubject<PagePlace>;

    constructor(private placeRestService: PlaceRestService,
                private authService: AuthService,
                private router: Router) {
        this.obj = null;
        this.obsObj = new BehaviorSubject<PagePlace>(this.obj);
    }

    // ------------------------------------------------------------------------------------------- //
    // GET
    // ------------------------------------------------------------------------------------------- //

    public obs_getPage(zone: number): Observable<PagePlace> {
        this.placeRestService.getPlacePage(zone).subscribe(
            (data: HttpResponse<PagePlace>) => {
                if (data.ok && data.status === AppISetting.HTTP_OK) {
                    this.obj = data.body;
                    this.obsObj.next(this.obj);
                }
            },
            (err: HttpErrorResponse) => {
                if (err.ok === false) { switch (err.status) {
                    case AppISetting.HTTP_NOTFOUND:   this.router.navigate(['/not-found']); break;
                    case AppISetting.HTTP_FORBIDDEN:  this.router.navigate(['/forbidden']); break;
                    case AppISetting.HTTP_UNAUTHORIZED: this.authService.signOut(); break;
                    default: if (err.error) {console.log(err.error.message); } break;
                }} else {console.log('Pb HTTP REST'); }});
        return this.obsObj.asObservable();
    }

    public pro_getPage(zone: number): Promise<PagePlace> {
        return new Promise((resolve, reject) => {
            this.placeRestService.getPlacePage(zone).subscribe(
                (data: HttpResponse<PagePlace>) => {
                    if (data.ok && data.status === AppISetting.HTTP_OK) {
                        this.obj = data.body;
                        this.obsObj.next(this.obj);
                        resolve(this.obj);
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err.ok === false) { switch (err.status) {
                        case AppISetting.HTTP_NOTFOUND:   this.router.navigate(['/not-found']); break;
                        case AppISetting.HTTP_FORBIDDEN:  this.router.navigate(['/forbidden']); break;
                        case AppISetting.HTTP_UNAUTHORIZED: this.authService.signOut(); break;
                        default: if (err.error) {console.log(err.error.message); } break;
                    }} else {console.log('Pb HTTP REST'); }
                    reject(null);
                });
        });
    }
}
