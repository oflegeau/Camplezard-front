import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagePlace} from '../back-model/PagePlace';

@Injectable()
export class PlaceRestService {

    private localurl = environment.apiUrl + 'place';

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

    // PlacePage //
    getPlacePage(zone: number): Observable<HttpResponse<PagePlace>> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Basic ' + btoa(localStorage.getItem('token') + ':' + this.setPassword()))
            .set('Content-Type', 'application/json');

        const paramas = new HttpParams()
            .set('zone', zone.toString());

        return this.http.get<PagePlace>(this.localurl + '/page', {headers,  params: paramas, observe: 'response'});
    }
}
