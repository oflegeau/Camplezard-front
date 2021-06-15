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
import {UserComponent} from './navigation/user/user.component';
import {MemberListComponent} from './member/member-list/member-list.component';
import {MemberItemComponent} from './member/member-item/member-item.component';
import {CampingHomeComponent} from './camping/camping-home/camping-home.component';
import {RegisterComponent} from './navigation/register/register.component';
import {ConditionsComponent} from './navigation/conditions/conditions.component';
import {HelpComponent} from './navigation/help/help.component';
import {RulesComponent} from './navigation/rules/rules.component';
import {HomeComponent} from './navigation/home/home.component';
import {ForgotPasswordComponent} from './navigation/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './navigation/verify-email/verify-email.component';
import {HomeUserComponent} from './navigation/home-user/home-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/app/home', pathMatch: 'full'},
  { path: 'lock', component: LockComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email', component: VerifyEmailComponent},
  { path: 'condition', component: ConditionsComponent},
  { path: 'rules', component: RulesComponent},
  { path: 'help', component: HelpComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: 'home-user', component: HomeUserComponent},
  {
    path: 'app/home',
    data: {
      breadcrumb: '',
    },
    canActivate: [AuthGuard],
    children: [{
                    path: '',
                    component: HomeComponent,
                },
                  {
                    path: 'camping',
                    component: CampingHomeComponent,
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
