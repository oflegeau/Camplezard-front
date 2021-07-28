
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
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'parent';
                case AppISetting.MEMBER_MEMBER:
                    return 'member';
                case AppISetting.MEMBER_CLIENT:
                    return 'client';
            }
        }
        if (format === 'btn') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'btn-white';
                case AppISetting.MEMBER_MEMBER:
                    return 'btn-info';
                case AppISetting.MEMBER_CLIENT:
                    return 'btn-primary';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'text-white';
                case AppISetting.MEMBER_MEMBER:
                    return 'text-secondary';
                case AppISetting.MEMBER_CLIENT:
                    return 'text-primary';
            }
        }
        if (format === 'color-text') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return 'text-black'
                case AppISetting.MEMBER_MEMBER:
                    return 'text-white'
                case AppISetting.MEMBER_CLIENT:
                    return 'text-black'
            }
        }
        if (format === 'color-code') {
            switch (param) {
                case AppISetting.MEMBER_ALL:      // tous sauf partis
                    return AppISetting.COLOR_WHITE;
                case AppISetting.MEMBER_MEMBER:
                    return AppISetting.COLOR_SECONDARY;
                case AppISetting.MEMBER_CLIENT:
                    return AppISetting.COLOR_PRIMARY;
            }
        }
        return '';
    }
}
