import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../guard/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AppISetting} from '../interface/app.interface.setting';
import {MemberRestService} from '../rest/member.rest.service';
import {Member} from '../back-model/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberListService {

  private list: Member[];
  private obsList: BehaviorSubject<Member[]>;

  constructor(private memberRestService: MemberRestService,
              private authService: AuthService,
              private router: Router) {
    this.list = null;
    this.obsList = new BehaviorSubject<Member[]>(this.list);
  }

  // ------------------------------------------------------------------------------------------- //
  // GET
  // ------------------------------------------------------------------------------------------- //

  public get_obs(): Observable<Member[]> {
    this.memberRestService.getMemberList().subscribe(
        (data: HttpResponse<Member[]>) => {
          if (data.ok && data.status === AppISetting.HTTP_OK) {
            this.list = data.body;
            this.obsList.next(this.list);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.ok === false) { switch (err.status) {
            case AppISetting.HTTP_NOTFOUND:   this.router.navigate(['/not-found']); break;
            case AppISetting.HTTP_FORBIDDEN:  this.router.navigate(['/forbidden']); break;
            case AppISetting.HTTP_UNAUTHORIZED: this.authService.signOut(); break;
            default: if (err.error) {console.log(err.error.message); } break;
          }} else {console.log('Pb HTTP REST'); }});
    return this.obsList.asObservable();
  }

  public get_prom(): Promise<Member[]> {
    return new Promise((resolve, reject) => {
      this.memberRestService.getMemberList().subscribe(
          (data: HttpResponse<Member[]>) => {
            if (data.ok && data.status === AppISetting.HTTP_OK) {
              this.list = data.body;
              this.obsList.next(this.list);
              resolve(this.list);
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

  // ------------------------------------------------------------------------------------------- //
}
