import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {AppISetting} from '../../app.interface.setting';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let role = {admin: false, manager: false, user: false};
    role = JSON.parse(next.data.role);

    switch (this.authService.userData.role) {
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
        if (role.user) {
          return true;
        }
        break;
    }

    // navigate to not found page
    this.router.navigate(['/forbidden']);
    return false;
  }
}
