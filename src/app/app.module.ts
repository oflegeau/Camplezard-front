import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule , registerLocaleData} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {
  AlertModule, BsDatepickerModule,
  BsDropdownModule, CarouselModule,
  CollapseModule, ModalModule, PaginationModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TimepickerModule,
  TooltipModule
} from 'ngx-bootstrap';
import {TagInputModule} from 'ngx-chips';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppRoutingModule} from './app-routing.module';
import {MemberModule} from './member/member.module';
import {NavigationModule} from './navigation/navigation.module';
import {ConnectRestService} from './service/rest/connect.rest.service';
import {MemberListService} from './service/service/member.list.service';
import {MemberRestService} from './service/rest/member.rest.service';
import {GlobalVariableService} from './service/service/global.variable.service';
import {AuthService} from './service/guard/auth.service';
import {RoleGuard} from './service/guard/authRole.service';
import {AuthGuard} from './service/guard/authGuard.service';
import {ServiceModule} from './service/service.module';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        TimepickerModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        TagInputModule,
        AngularMultiSelectModule,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgSelectModule,
        ServiceModule,
        NavigationModule,
        MemberModule,
    ],
    providers: [{provide: LOCALE_ID, useValue: 'fr-FR'},
                AuthService, AuthGuard, RoleGuard,
                GlobalVariableService,
                ConnectRestService,
                MemberRestService, MemberListService,],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
