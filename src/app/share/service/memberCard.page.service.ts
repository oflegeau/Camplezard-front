import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {PageMember} from '../back-model/PageMember';
import {MemberRestService} from '../rest/member.rest.service';
import {AuthService} from '../guard/auth.service';
import {AppISetting} from '../interface/app.interface.setting';
import {MemberCard} from '../back-model/MemberCard';
import {Reponse} from '../back-model/Reponse';

@Injectable({
  providedIn: 'root'
})
export class MemberCardPageService {

  private page: PageMember;
  private obs: BehaviorSubject<PageMember>;

  constructor(private memberRestService: MemberRestService,
              private authService: AuthService,
              private router: Router) {
    this.page = null;
    this.obs = new BehaviorSubject<PageMember>(this.page);
  }

  // ------------------------------------------------------------------------------------------- //
  // GET
  // ------------------------------------------------------------------------------------------- //

  obs_getPage(page: number,
              size: number,
              typeFilter: number,
              sortAsc: boolean,
              sortName: string): Observable<PageMember> {
    this.memberRestService.getPage(page, size, typeFilter, sortAsc, sortName).subscribe(
      (data: HttpResponse<PageMember>) => {
        if (data.ok && data.status === AppISetting.HTTP_OK) {

          this.page = data.body;
          this.obs.next(this.page);
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

  // -----------------------------------------------------------------------------  //
  //                                  POST                                          //
  // ------------------------------------------------------------------------------ //

  pro_create(obj: MemberCard): Promise<Reponse> {

    return new Promise((resolve, reject) => {
      this.memberRestService.createMemberCard(obj).subscribe(
        (data: HttpResponse<Reponse>) => {
          if (data.ok && data.status === AppISetting.HTTP_CREATED) {

            obj.id = data.body.ids;

            // pas de push local car relance du serveur OBLIGATOIRE / pagination
            resolve(new Reponse(true, '', 0, obj.id, 0));
          } else {
            resolve(new Reponse(false, '!HTTP_CREATED', 0, '', 0));
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
  //                                  PUT                                           //
  // ------------------------------------------------------------------------------ //

  pro_update(obj: MemberCard): Promise<Reponse> {
    return new Promise((resolve, reject) => {
      this.memberRestService.update(obj).subscribe(
        (data: HttpResponse<Reponse>) => {
          if (data.ok && data.status === AppISetting.HTTP_ACCEPTED && data.body.ids === obj.id) {

            const index = this.page.items.findIndex(item => item.id === obj.id);
            if (index !== -1) {
              this.page.items[index] = obj;
            }

            this.obs.next(this.page);
            resolve(new Reponse(true, '', 0, obj.id, 0));
          } else {
            resolve(new Reponse(false, '!HTTP_ACCEPTED', 0, '', 0));
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

  pro_delete(obj: MemberCard): Promise<Reponse> {
    return new Promise((resolve, reject) => {
      this.memberRestService.delete(obj.id).subscribe(
        (data: HttpResponse<Reponse>) => {
          if (data.ok && data.status === AppISetting.HTTP_OK && data.body.ids === obj.id) {

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

  // ------------------------------------------------------------------------------------------- //
}
