import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {RoleGuard} from './service/guard/authRole.service';
import {LockComponent} from './navigation/lock/lock.component';
import {LoginComponent} from './navigation/login/login.component';
import {ForbiddenComponent} from './navigation/forbidden/forbidden.component';
import {NotFoundComponent} from './navigation/not-found/not-found.component';
import {AuthGuard} from './service/guard/authGuard.service';
import {HomePageComponent} from './navigation/home-page/home-page.component';
import {IconsComponent} from './navigation/icons/icons.component';
import {UserComponent} from './navigation/user/user.component';
import {MemberListComponent} from './member/member-list/member-list.component';
import {MemberItemComponent} from './member/member-item/member-item.component';
import {CampingHomeComponent} from './camping/camping-home/camping-home.component';

const routes: Routes = [
 // {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: 'fullscreen/lock',
    component: LockComponent
  },
  {
    path: 'fullscreen/login',
    component: LoginComponent
  },
  {
    path: 'fullscreen/forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'fullscreen/not-found',
    component: NotFoundComponent
  },
  {
    path: '',
    data: {
      breadcrumb: '',
    },
    canActivate: [AuthGuard],
    children: [{
      path: '',
      component: HomePageComponent,
    },
      {
        path: 'home',
        component: CampingHomeComponent,
        canActivate: [RoleGuard],
        data: {
          role: JSON.stringify({admin: true, manager: true, user: false}),
          breadcrumb: 'Mon Dashboard',
        },
      },
      {
        path: 'icons',
        component: IconsComponent,
        canActivate: [RoleGuard],
        data: {
          role: JSON.stringify({admin: true, manager: true, user: false}),
          breadcrumb: 'Mon Dashboard',
        },
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: {
          role: JSON.stringify({admin: true, manager: true, user: false}),
          breadcrumb: 'Mon Compte',
        },
      },
    ]
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Ressources',
    },
    children: [
      {
        path: '',
        canActivate: [RoleGuard],
        data: {
          role: JSON.stringify({admin: true, manager: true, user: false}),
        },
        children: [{
          path: '',
          component: MemberListComponent,
        },
          {
            path: ':id',
            canActivate: [RoleGuard],
            data: {
              role: JSON.stringify({admin: true, manager: true, user: false}),
              breadcrumb: 'ItemMember',
            },
            children:
                [
                  {
                    path: '',
                    component: MemberItemComponent,
                  },
                /*  {
                    path: 'activity/:yearmonth',
                    component: MemberActiveComponent,
                    canActivate: [RoleGuard],
                    data: {
                      role: JSON.stringify({admin: true, manager: true, master: true, user: false}),
                      breadcrumb: 'ItemMemberActivity',
                    }
                  },
                  {
                    path: 'leave/:year',
                    component: MemberLeaveComponent,
                    canActivate: [RoleGuard],
                    data: {
                      role: JSON.stringify({admin: true, manager: true, master: true, user: false}),
                      breadcrumb: 'ItemMemberLeave',
                    }
                  },
                  {
                    path: 'salary/:year',
                    component: MemberSalaryComponent,
                    canActivate: [RoleGuard],
                    data: {
                      role: JSON.stringify({admin: true, manager: true, master: true, user: false}),
                      breadcrumb: 'ItemMemberSalary',
                    }
                  },*/
                ]
          },
        ]
      },
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
