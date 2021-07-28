import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GetIconPipe} from './pipe/pipe.icon';
import {IsBinaryColorPipe, IsBinaryPipe, IsRoleAdminPipe, IsRoleManagerPipe, IsRoleMemberPipe, IsRoleUserPipe} from './pipe/pipe.is';
import {LogoPipe, PhotoPipe, SanitizePipe} from './pipe/pipe.photo';
import {ModalConfirmCreateComponent} from './composant/modal-confirm-create/modal-confirm-create.component';
import {PictureUploadComponent} from './composant/picture-upload/picture-upload.component';
import {ModalConfirmDeleteComponent} from './composant/modal-confirm-delete/modal-confirm-delete.component';
import {DivBy100Pipe, DivBy10Pipe, IsDateNotNullPipe} from './pipe/pipe.format';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ToastrModule} from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap';
import {GetTypePlacePipe} from './pipe/pipe.place';
import {ControlPeriodComponent} from './composant/control-period/control-period.component';
import {GetTypeMemberPipe} from './pipe/pipe.member';
import {CardKpiComponent} from './composant/card-kpi/card-kpi.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        GetIconPipe,
        IsRoleUserPipe,
        IsRoleAdminPipe,
        IsRoleManagerPipe,
        IsRoleMemberPipe,
        IsBinaryPipe,
        IsBinaryColorPipe,
        SanitizePipe,
        PhotoPipe,
        LogoPipe,
        DivBy100Pipe,
        DivBy10Pipe,
        GetTypePlacePipe,
        GetTypeMemberPipe,
        IsDateNotNullPipe,
        ModalConfirmDeleteComponent,
        ModalConfirmCreateComponent,
        PictureUploadComponent,
        ControlPeriodComponent,
        CardKpiComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        HammerModule,
        ImageCropperModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RouterModule,
    ],
    exports: [
        GetIconPipe,
        IsRoleUserPipe,
        IsRoleAdminPipe,
        IsRoleManagerPipe,
        IsRoleMemberPipe,
        IsBinaryPipe,
        IsBinaryColorPipe,
        SanitizePipe,
        PhotoPipe,
        LogoPipe,
        DivBy100Pipe,
        DivBy10Pipe,
        IsDateNotNullPipe,
        GetTypePlacePipe,
        GetTypeMemberPipe,
        ModalConfirmDeleteComponent,
        ModalConfirmCreateComponent,
        PictureUploadComponent,
        ControlPeriodComponent,
        CardKpiComponent
    ],
    entryComponents: [
    ],
    providers: [],
})
export class ShareModule {}
