
import {Pipe, PipeTransform} from '@angular/core';
import {AppISetting} from '../interface/app.interface.setting';

@Pipe({name: 'getTypeMember'})
export class GetTypeMemberPipe implements PipeTransform {
    constructor() {
    }

    transform(param: number, format: string): string {
        if (format === 'text') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'Tous';
                case AppISetting.MEMBER_MEMBER:
                    return 'Membre.';
                case AppISetting.MEMBER_CLIENT:
                    return 'Client';
                case AppISetting.MEMBER_OUT:
                    return 'Partis';
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return '';
                case AppISetting.MEMBER_MEMBER:
                    return 'fad fa-house-user';
                case AppISetting.MEMBER_CLIENT:
                    return 'fad fa-user-cog';
                case AppISetting.MEMBER_OUT:
                    return 'fad fa-user-graduate';
            }
        }
        if (format === 'btn') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return '';
                case AppISetting.MEMBER_MEMBER:
                    return 'btn-info';
                case AppISetting.MEMBER_CLIENT:
                    return 'btn-primary';
                case AppISetting.MEMBER_OUT:
                    return 'btn-warning';
            }
        }
        if (format === 'background') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return '#4B515D';
                case AppISetting.MEMBER_MEMBER:
                    return '#217CA3';
                case AppISetting.MEMBER_CLIENT:
                    return '#E29930';
                case AppISetting.MEMBER_OUT:
                    return '#F0BA18';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                case AppISetting.MEMBER_MEMBER:
                case AppISetting.MEMBER_CLIENT:
                    return '#e3e3e3';
                case AppISetting.MEMBER_OUT:
                    return '#211f30';
            }
        }
        if (format === 'badge') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'badge-default';
                case AppISetting.MEMBER_MEMBER:
                    return 'badge-secondary';
                case AppISetting.MEMBER_CLIENT:
                    return 'badge-primary';
                case AppISetting.MEMBER_OUT:
                    return 'badge-danger';
            }
        }
        return '';
    }
}

@Pipe({name: 'getTypeRole'})
export class GetTypeRolePipe implements PipeTransform {
    constructor() {
    }

    transform(param: number, format: string): string {
        if (format === 'text') {
            switch (param) {
                case AppISetting.ROLE_ADMIN:
                    return 'Administrateur';
                case AppISetting.ROLE_MANAGER:
                    return 'Manager';
                case AppISetting.ROLE_MEMBER:
                    return 'Membre';
                case AppISetting.ROLE_CUSTOMER:
                    return 'Client';
                case AppISetting.ROLE_USER:
                    return 'Utilisateur';
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.ROLE_ADMIN:
                    return 'database';
                case AppISetting.ROLE_MANAGER:
                    return 'user-tie';
                case AppISetting.ROLE_MEMBER:
                    return 'member-team';
                case AppISetting.ROLE_CUSTOMER:
                    return 'client';
                case AppISetting.ROLE_USER:
                    return 'user-alt';
            }
        }
        return '';
    }
}
