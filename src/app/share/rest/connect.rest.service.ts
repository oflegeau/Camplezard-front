import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Connect} from '../back-model/Connect';
import {environment} from '../../../environments/environment';
import {Reponse} from '../back-model/Reponse';

@Injectable()
export class ConnectRestService {

  private localurl = environment.apiUrl + 'connect';

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

  getList(): Observable<HttpResponse<Connect[]>> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
      .set('Content-Type', 'application/json');

    return this.http.get<Connect[]>(this.localurl, {headers, observe: 'response'});
  }

  getConnect(): Observable<HttpResponse<Connect>> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
      .set('Content-Type', 'application/json');

    return this.http.get<Connect>(this.localurl + '/last', {headers , observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            POST
  //
  // ---------------------------------------------------------------------------------------------- //

  create(token: string, name: string, surname: string, phone: string): Observable<HttpResponse<Reponse>> {
    const paramas = new HttpParams()
      .set('name', name)
      .set('surname', surname)
      .set('phone', phone);

    return this.http.post<Reponse>(this.localurl + '/create', token, {params: paramas, observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            PUT
  //
  // ---------------------------------------------------------------------------------------------- //

  updateRole(idConnect: string, role: number): Observable<HttpResponse<Connect>> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
      .set('Content-Type', 'application/json');

    const paramas = new HttpParams()
      .set('role', role.toString());

    return this.http.put<Connect>(this.localurl + '/update/role', idConnect, {
      headers,
      params: paramas,
      observe: 'response'
    });
  }

  update(obj: Connect): Observable<HttpResponse<Connect>> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
      .set('Content-Type', 'application/json');

    return this.http.put<Connect>(this.localurl + '/update', obj, {headers, observe: 'response'});
  }

  // ---------------------------------------------------------------------------------------------- //
  //
  //            DEL
  //
  // ---------------------------------------------------------------------------------------------- //

  delete(id: string): Observable<HttpResponse<Reponse>> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
      .set('Content-Type', 'application/json');

    return this.http.delete<Reponse>(this.localurl + '/delete/' + id, {headers, observe: 'response'});
  }
}
