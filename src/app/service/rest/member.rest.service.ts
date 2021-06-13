import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connect} from '../model/Connect';
import {PageMember} from '../model/PageMember';
import {environment} from '../../../environments/environment';
import {Member, MemberCard, MemberPhoto} from '../model/MemberCard';
import {Reponse} from '../model/Reponse';

@Injectable()
export class MemberRestService {

  private localurl = environment.apiUrl + 'member';

  constructor(private http: HttpClient) {
  }

  setPassword() {
    const user = JSON.parse(localStorage.getItem('user'));
    const date = new Date();
    return date.getDate() + date.getMonth() + user.uid.substring(0, 10) + date.getFullYear() + user.uid.substring(15, 20);
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            GET
  //
  // ---------------------------------------------------------------------------------------------- //

  // MemberList //
  getMemberList(): Observable<HttpResponse<Member[]>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.get<Member[]>(this.localurl, {headers, observe: 'response'});
  }

  // MemberPhoto List //
  getMemberPhotoList(): Observable<HttpResponse<MemberPhoto[]>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.get<MemberPhoto[]>(this.localurl + '/photo', {headers, observe: 'response'});
  }

  // MemberCard //
  getPage(page: number,
          size: number,
          typeNation: number,
          sortAsc: boolean,
          sortName: string): Observable<HttpResponse<PageMember>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    const paramas = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('typeNation', typeNation.toString())
      .set('sortAsc', sortAsc.toString())
      .set('sortName', sortName);

    return this.http.get<PageMember>(this.localurl + '/page', {headers, params: paramas, observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            POST
  //
  // ---------------------------------------------------------------------------------------------- //

  create(obj: MemberCard): Observable<HttpResponse<Reponse>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.post<Reponse>(this.localurl + '/create', obj, {headers, observe: 'response'});
  }

  createConnect(obj: MemberCard, idConnect: string): Observable<HttpResponse<Connect>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.post<Connect>(this.localurl + '/create/connect/' + idConnect, obj, {headers, observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            PUT
  //
  // ---------------------------------------------------------------------------------------------- //

  update(obj: MemberCard): Observable<HttpResponse<Reponse>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.put<Reponse>(this.localurl + '/update', obj, {headers, observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            DELETE
  //
  // ---------------------------------------------------------------------------------------------- //

  delete(id: string): Observable<HttpResponse<Reponse>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.delete<Reponse>(this.localurl + '/delete/' + id, {headers, observe: 'response'});
  }

  deleteConnect(id: string): Observable<HttpResponse<Reponse>> {
    const headers = new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
        .set('Content-Type', 'application/json');

    return this.http.delete<Reponse>(this.localurl + '/delete/connect/' + id, {headers, observe: 'response'});
  }
}
