import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {MemberListComponent} from '../member/member-list/member-list.component';
import { CampingHomeComponent } from './camping-home/camping-home.component';
import {ShareModule} from '../share/share.module';
import { CampingPlaceCardComponent } from './camping-composant/camping-place-card/camping-place-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule, ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        BsDropdownModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        AngularMultiSelectModule,
        TabsModule,
        ShareModule
    ],
    declarations: [
    CampingHomeComponent,
    CampingPlaceCardComponent
    ],
    entryComponents: [],
    exports: []
})
export class CampingModule {}
