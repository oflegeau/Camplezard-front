import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {GetIconPipe} from './pipe/pipe.icon';
import {IsBinaryColorPipe, IsBinaryPipe, IsRoleAdminPipe, IsRoleManagerPipe, IsRoleMemberPipe, IsRoleUserPipe} from './pipe/pipe.is';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
    ],
    declarations: [
        GetIconPipe,
        IsRoleUserPipe,
        IsRoleAdminPipe,
        IsRoleManagerPipe,
        IsRoleMemberPipe,
        IsBinaryPipe,
        IsBinaryColorPipe,
    ],
    exports: [
        GetIconPipe,
        IsRoleUserPipe,
        IsRoleAdminPipe,
        IsRoleManagerPipe,
        IsRoleMemberPipe,
        IsBinaryPipe,
        IsBinaryColorPipe,
    ],
    providers: [],
})
export class ServiceModule {}
