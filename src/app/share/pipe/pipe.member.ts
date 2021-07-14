import {AppISetting} from '../interface/app.interface.setting';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'getTypeMember'})
export class GetTypeMemberPipe implements PipeTransform {
    constructor() {
    }

    transform(param: number, format: string): string {
        if (format === 'text') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                    return 'Liksi';
                case AppISetting.MEMBER_STRUCT:
                    return 'Struct.';
                case AppISetting.MEMBER_PROD:
                    return 'Prod.';
                case AppISetting.MEMBER_INTERN:
                    return 'Stage';
                case AppISetting.MEMBER_EXT:
                    return 'Ext.';
                case AppISetting.MEMBER_OUT:
                    return 'Partis';
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                    return '';
                case AppISetting.MEMBER_STRUCT:
                    return 'fad fa-house-user';
                case AppISetting.MEMBER_PROD:
                    return 'fad fa-user-cog';
                case AppISetting.MEMBER_INTERN:
                    return 'fad fa-user-graduate';
                case AppISetting.MEMBER_EXT:
                    return 'fad fa-user-times';
                case AppISetting.MEMBER_OUT:
                    return 'fad fa-user-slash';
            }
        }
        if (format === 'btn') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                    return '';
                case AppISetting.MEMBER_STRUCT:
                    return 'btn-info';
                case AppISetting.MEMBER_PROD:
                    return 'btn-primary';
                case AppISetting.MEMBER_INTERN:
                    return 'btn-warning';
                case AppISetting.MEMBER_EXT:
                case AppISetting.MEMBER_OUT:
                    return 'btn-danger';
            }
        }
        if (format === 'background') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                    return '#4B515D';
                case AppISetting.MEMBER_STRUCT:
                    return '#217CA3';
                case AppISetting.MEMBER_PROD:
                    return '#E29930';
                case AppISetting.MEMBER_INTERN:
                    return '#F0BA18';
                case AppISetting.MEMBER_EXT:
                case AppISetting.MEMBER_OUT:
                    return '#F07148';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                case AppISetting.MEMBER_STRUCT:
                case AppISetting.MEMBER_EXT:
                case AppISetting.MEMBER_OUT:
                    return '#e3e3e3';
                case AppISetting.MEMBER_PROD:
                case AppISetting.MEMBER_INTERN:
                    return '#211f30';
            }
        }
        if (format === 'badge') {
            switch (param) {
                case AppISetting.MEMBER_LIKSI:      // tous sauf partis
                    return 'badge-default';
                case AppISetting.MEMBER_STRUCT:
                    return 'badge-secondary';
                case AppISetting.MEMBER_PROD:
                    return 'badge-primary';
                case AppISetting.MEMBER_INTERN:
                    return 'badge-warning';
                case AppISetting.MEMBER_EXT:
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
                case AppISetting.ROLE_MASTER:
                    return 'Tech Lead';
                case AppISetting.ROLE_MEMBER:
                    return 'Membre';
                case AppISetting.ROLE_CLIENT:
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
                case AppISetting.ROLE_MASTER:
                    return 'user-cog';
                case AppISetting.ROLE_MEMBER:
                    return 'member-team';
                case AppISetting.ROLE_CLIENT:
                    return 'client';
                case AppISetting.ROLE_USER:
                    return 'user-alt';
            }
        }
        return '';
    }
}
