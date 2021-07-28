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
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgSelectModule} from '@ng-select/ng-select';
import {AppRoutingModule} from './app-routing.module';
import {MemberModule} from './member/member.module';
import {NavigationModule} from './navigation/navigation.module';
import {ConnectRestService} from './share/rest/connect.rest.service';
import {MemberListService} from './share/service/member.list.service';
import {MemberRestService} from './share/rest/member.rest.service';
import {GlobalVariableService} from './share/service/global.variable.service';
import {AuthService} from './share/guard/auth.service';
import {RoleGuard} from './share/guard/authRole.service';
import {AuthGuard} from './share/guard/authGuard.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {CampingModule} from './camping/camping.module';
import {ShareModule} from './share/share.module';
import {PlacePageService} from './share/service/place.page.service';
import {PlaceRestService} from './share/rest/place.rest.service';
import {MemberCardPageService} from './share/service/memberCard.page.service';
import {MemberService} from './share/service/member.service';
import {PlaceService} from './share/service/place.service';
import {PlaceListService} from './share/service/place.list.service';

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
        ShareModule,
        NavigationModule,
        MemberModule,
        CampingModule,
    ],
    providers: [{provide: LOCALE_ID, useValue: 'fr-FR'},
                AuthService, AuthGuard, RoleGuard,
                GlobalVariableService,
                ConnectRestService,
                MemberRestService, MemberListService, MemberCardPageService, MemberService,
                PlaceRestService, PlacePageService, PlaceService, PlaceListService],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
