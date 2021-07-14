import {Pipe, PipeTransform} from '@angular/core';
import {AppISetting} from '../interface/app.interface.setting';

@Pipe({name: 'getTypePlace'})
export class GetTypePlacePipe implements PipeTransform {
    constructor() {
    }

    transform(param: number, format: string): string {
        if (format === 'text') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return 'Libre';
                case AppISetting.PLACE_BOOKED:
                    return 'Réservé';
                case AppISetting.PLACE_BUSY:
                    return 'Occupé';
                case AppISetting.PLACE_OFF:
                    return 'HS';
            }
        }
        if (format === 'icon') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return 'fad fa-comments';
                case AppISetting.PLACE_BOOKED:
                    return 'fad fa-anchor';
                case AppISetting.PLACE_BUSY:
                    return 'fad fa-comments-alt-dollar';
                case AppISetting.PLACE_OFF:
                    return 'fad fa-comments-dollar';
            }
        }
        if (format === 'btn') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return 'btn-success';
                case AppISetting.PLACE_BOOKED:
                    return 'btn-secondary';
                case AppISetting.PLACE_BUSY:
                    return 'btn-primary';
                case AppISetting.PLACE_OFF:
                    return 'btn-danger';
            }
        }
        if (format === 'background') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return '#1CB4BA';
                case AppISetting.PLACE_BOOKED:
                    return '#217CA3';
                case AppISetting.PLACE_BUSY:
                    return '#E29930';
                case AppISetting.PLACE_OFF:
                    return '#F07148';
            }
        }
        if (format === 'color') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return '#211f30';
                case AppISetting.PLACE_BOOKED:
                    return '#211f30';
                case AppISetting.PLACE_BUSY:
                    return '#e3e3e3';
                case AppISetting.PLACE_OFF:
                    return '#e3e3e3';
            }
        }
        if (format === 'badge') {
            switch (param) {
                case AppISetting.PLACE_FREE:
                    return 'badge-success';
                case AppISetting.PLACE_BOOKED:
                    return 'badge-secondary';
                case AppISetting.PLACE_BUSY:
                    return 'badge-primary';
                case AppISetting.PLACE_OFF:
                    return 'badge-danger';
            }
        }
        return '';
    }
}
