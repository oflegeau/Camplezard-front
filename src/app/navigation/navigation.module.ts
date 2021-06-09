import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DxVectorMapModule } from 'devextreme-angular';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {HomePageComponent} from './home-page/home-page.component';
import {UserComponent} from './user/user.component';
import {LockComponent} from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ParamComponent } from './param/param.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {AlertConfig, BsDatepickerModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {IconsComponent} from './icons/icons.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule, ReactiveFormsModule,
        JwBootstrapSwitchNg2Module,
        DxVectorMapModule,
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        AngularMultiSelectModule,
        BsDatepickerModule,
        NgSelectModule,
    ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AuthNavbarComponent,
    LockComponent,
    NotFoundComponent,
    ForbiddenComponent,
    UserComponent,
    HomePageComponent,
    LoginComponent,
    ParamComponent,
    IconsComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AuthNavbarComponent,
    LockComponent,
    NotFoundComponent,
    ForbiddenComponent,
    UserComponent,
    HomePageComponent,
    LoginComponent
  ],
    providers: [AlertConfig, BsDatepickerConfig],
})
export class NavigationModule {}
