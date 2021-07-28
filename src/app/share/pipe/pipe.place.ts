import {Pipe, PipeTransform} from '@angular/core';
import {AppISetting} from '../interface/app.interface.setting';

@Pipe({name: 'getTypePlace'})
export class GetTypePlacePipe implements PipeTransform {
    constructor() {
    }

    transform(param: number, format: string): string {
        if (format === 'text') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'Tous';
                case AppISetting.PLACE_STATE:
                    return 'Structure';
                case AppISetting.PLACE_OFF:
                    return 'HS';
                case AppISetting.PLACE_BUSY:
                    return 'Occupé';
                case AppISetting.PLACE_BOOKED:
                    return 'Réservé';
                case AppISetting.PLACE_FREE:
                    return 'Libre';
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'parent';
                case AppISetting.PLACE_STATE:
                    return 'home';
                case AppISetting.PLACE_OFF:
                    return 'construction';
                case AppISetting.PLACE_BUSY:
                    return 'contribute';
                case AppISetting.PLACE_BOOKED:
                    return 'booked';
                case AppISetting.PLACE_FREE:
                    return 'free'
            }
        }
        if (format === 'btn') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'btn-white';
                case AppISetting.PLACE_STATE:
                    return 'btn-secondary';
                case AppISetting.PLACE_OFF:
                    return 'btn-danger';
                case AppISetting.PLACE_BUSY:
                    return 'btn-primary';
                case AppISetting.PLACE_BOOKED:
                    return 'btn-info';
                case AppISetting.PLACE_FREE:
                    return 'btn-success';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'text-white';
                case AppISetting.PLACE_STATE:
                    return 'text-secondary';
                case AppISetting.PLACE_OFF:
                    return 'text-danger';
                case AppISetting.PLACE_BUSY:
                    return 'text-primary';
                case AppISetting.PLACE_BOOKED:
                    return 'text-info';
                case AppISetting.PLACE_FREE:
                    return 'text-success';
            }
        }
        if (format === 'color-text') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'text-black'
                case AppISetting.PLACE_STATE:
                    return 'text-white'
                case AppISetting.PLACE_OFF:
                    return 'text-white';
                case AppISetting.PLACE_BUSY:
                    return 'text-black';
                case AppISetting.PLACE_BOOKED:
                    return 'text-white';
                case AppISetting.PLACE_FREE:
                    return 'text-white';
            }
        }
        if (format === 'color-code') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return AppISetting.COLOR_WHITE;
                case AppISetting.PLACE_STATE:
                    return AppISetting.COLOR_SECONDARY;
                case AppISetting.PLACE_OFF:
                    return AppISetting.COLOR_DANGER;
                case AppISetting.PLACE_BUSY:
                    return AppISetting.COLOR_PRIMARY;
                case AppISetting.PLACE_BOOKED:
                    return AppISetting.COLOR_INFO;
                case AppISetting.PLACE_FREE:
                    return AppISetting.COLOR_SUCCESS;
            }
        }
        return '';
    }
}
