import {MemberListComponent} from './member-list/member-list.component';
import {BsDatepickerModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {NgSelectModule} from '@ng-select/ng-select';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ShareModule} from '../share/share.module';
import {MemberModalComponent} from './member-component/member-modal/member-modal.component';

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
        ShareModule,
    ],
    declarations: [
        MemberListComponent,
        MemberModalComponent,
    ],
    entryComponents: [],
    exports: []
})
export class MemberModule {}
