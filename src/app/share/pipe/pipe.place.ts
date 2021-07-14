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
                    return 'btn-warning';
                case AppISetting.PLACE_STATE:
                    return 'btn-secondary';
                case AppISetting.PLACE_OFF:
                    return 'btn-danger';
                case AppISetting.PLACE_BUSY:
                    return 'btn-success';
                case AppISetting.PLACE_BOOKED:
                    return 'btn-info';
                case AppISetting.PLACE_FREE:
                    return 'btn-primary';
            }
        }
        if (format === 'background') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return '#DE7A22';
                case AppISetting.PLACE_STATE:
                    return '#F4CC70';
                case AppISetting.PLACE_OFF:
                    return '#F98866';
                case AppISetting.PLACE_BUSY:
                    return '#209488';
                case AppISetting.PLACE_BOOKED:
                    return '#80BD9E';
                case AppISetting.PLACE_FREE:
                    return '#89DA59';
            }
        }
        if (format === 'background-state') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return '#C46B1D';
                case AppISetting.PLACE_STATE:
                    return '#DBB865';
                case AppISetting.PLACE_OFF:
                    return '#E07B5C';
                case AppISetting.PLACE_BUSY:
                    return '#1B7A71';
                case AppISetting.PLACE_BOOKED:
                    return '#6FA389';
                case AppISetting.PLACE_FREE:
                    return '#78BF4E';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return '#e3e3e3';
                case AppISetting.PLACE_STATE:
                    return '#020202';
                case AppISetting.PLACE_OFF:
                    return '#e3e3e3';
                case AppISetting.PLACE_BUSY:
                    return '#e3e3e3';
                case AppISetting.PLACE_BOOKED:
                    return '#e3e3e3';
                case AppISetting.PLACE_FREE:
                    return '#020202';
            }
        }
        if (format === 'badge') {
            switch (param) {
                case AppISetting.PLACE_ALL:
                    return 'badge-warning';
                case AppISetting.PLACE_STATE:
                    return 'badge-secondary';
                case AppISetting.PLACE_OFF:
                    return 'badge-danger';
                case AppISetting.PLACE_BUSY:
                    return 'badge-success';
                case AppISetting.PLACE_BOOKED:
                    return 'badge-info';
                case AppISetting.PLACE_FREE:
                    return 'badge-primary';
            }
        }
        return '';
    }
}
