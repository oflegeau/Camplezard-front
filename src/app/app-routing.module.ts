import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import {RoleGuard} from './share/guard/authRole.service';
import {LockComponent} from './navigation/lock/lock.component';
import {LoginComponent} from './navigation/login/login.component';
import {ForbiddenComponent} from './navigation/forbidden/forbidden.component';
import {NotFoundComponent} from './navigation/not-found/not-found.component';
import {AuthGuard} from './share/guard/authGuard.service';
import {UserComponent} from './navigation/user/user.component';
import {MemberListComponent} from './member/member-list/member-list.component';
import {MemberItemComponent} from './member/member-item/member-item.component';
import {CampingHomeComponent} from './camping/camping-home/camping-home.component';
import {RegisterComponent} from './navigation/register/register.component';
import {HelpComponent} from './navigation/help/help.component';
import {ForgotPasswordComponent} from './navigation/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './navigation/verify-email/verify-email.component';
import {HomeUserComponent} from './navigation/home-user/home-user.component';
import {HomeVerifiedComponent} from './navigation/home-verified/home-verified.component';
import {HomePageComponent} from './navigation/home-page/home-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'lock', component: LockComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email', component: VerifyEmailComponent},
  { path: 'home-user', component: HomeUserComponent},
  { path: 'home-verified', component: HomeVerifiedComponent},
  { path: 'full/help', component: HelpComponent},
  { path: 'full/forbidden', component: ForbiddenComponent},
  { path: 'full/not-found', component: NotFoundComponent},
  {
    path: 'app/home',
    data: {
      breadcrumb: '',
    },
    canActivate: [AuthGuard],
    children: [{
                    path: '',
                    component: HomePageComponent,
                },
                  {
                    path: 'camping',
                    component: CampingHomeComponent,
                    canActivate: [RoleGuard],
                    data: {
                      role: JSON.stringify({admin: true, manager: true, customer: true, member: true, user: false}),
                      breadcrumb: 'Mon Dashboard',
                    },
                  },
                  {
                    path: 'user',
                    component: UserComponent,
                    canActivate: [RoleGuard],
                    data: {
                      role: JSON.stringify({admin: true, manager: true, customer: true, member: true, user: false}),
                      breadcrumb: 'Mon Compte',
                    },
                  },
                ]
  },
  {
    path: 'app/members',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Ressources',
    },
    children: [
      {
        path: '',
        canActivate: [RoleGuard],
        data: {
          role: JSON.stringify({admin: true, manager: true, customer: false, member: true, user: false}),
        },
        children: [{
          path: '',
          component: MemberListComponent,
        },
          {
            path: ':id',
            canActivate: [RoleGuard],
            data: {
              role: JSON.stringify({admin: true, manager: true,customer: false, member: true,  user: false}),
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
