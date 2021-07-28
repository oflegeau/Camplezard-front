import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AppISetting} from '../interface/app.interface.setting';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const connect = JSON.parse(localStorage.getItem('connect'));
    let role = {admin: false, manager: false, user: false};
    role = JSON.parse(next.data.role);

    switch (connect.role) {
      case AppISetting.ROLE_ADMIN:
        if (role.admin) {
          return true;
        }
        break;
      case AppISetting.ROLE_MANAGER:
        if (role.manager) {
          return true;
        }
        break;
      case AppISetting.ROLE_USER:
      default:
        this.router.navigate(['/home-user']);
        return false;
        break;
    }

    // navigate to not found page
    this.router.navigate(['/full/forbidden']);
    return false;
  }
}
