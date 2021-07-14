import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'getIcon'})
export class GetIconPipe implements PipeTransform {
    constructor() {
    }

    transform(name: string, type: string): string {

    switch (name)  {

        case 'menu' : return 'tim-icons icon-settings-gear-63';
        case 'zoom' : return 'tim-icons icon-zoom-split';
        case 'ban' : return type + ' fa-ban';
        case 'sort' : return type + ' fa-sort-up';
        case 'sync' : return type + ' fa-sync';
        case 'period' : return 'tim-icons icon-sound-wave';

        case 'create' : return type + ' fa-plus';
        case 'change' : return 'tim-icons icon-pencil';
        case 'remove' : return 'tim-icons icon-trash-simple';
        case 'exit' : return 'tim-icons icon-simple-remove';
        case 'link' : return type + ' fas fa-link';
        case 'unlink' : return type + ' fa-unlink';

        case 'lock' : return type + ' fa-lock-alt';
        case 'unlock' : return type + ' fa-lock-open-alt';
        case 'rank' : return 'tim-icons  icon-trophy';
        case 'close' : return type + ' fa-door-closed';
        case 'cancel' : return type + ' fa-clipboard-list-check';
        case 'percent' : return type + ' fa-percentage';

        case 'comment' : return type + ' fa-keyboard';
        case 'info' : return type + ' fa-info-square';
        case 'phone' : return type + ' fa-phone-volume';
        case 'email' : return type + ' fa-at';
        case 'male' : return type + ' fa-male';
        case 'female' : return type + ' fa-female';

        case 'trigram' : return type + ' fa-ad';
        case 'name' : return type + ' fa-user-tie';
        case 'surname' : return type + ' fa-user';
        case 'function' : return type + ' fa-user-tag';
        case 'city' : return type + ' fa-city';
        case 'code' : return type + ' fa-barcode';

        case 'creation' : return type + ' fa-calendar';
        case 'start' : return type + ' fa-calendar-plus';
        case 'end' : return type + ' fa-calendar-times';
        case 'delivery' : return type + ' fa-calendar-check';
        case 'days' : return type + ' fa-calendar-day';
        case 'turnover' : return type + ' fa-sack-dollar';

        case 'invoiced' : return type + ' fa-envelope-open-dollar';
        case 'paid' : return type + ' fa-hand-holding-usd';
        case 'margin' : return type + ' fa-funnel-dollar';
        case 'cost' : return type + ' fa-donate';
        case 'contribute' : return type + ' fa-people-carry';
        case 'action' : return type + ' fa-exclamation-square';

        case 'clients' : return type + ' fa-comments';
        case 'client' : return type + ' fa-comments-dollar';
        case 'prospect' : return type + ' fa-comments-alt-dollar';
        case 'contact' : return type + ' fa-address-book';
        case 'proposal' : return type + ' fa-file-contract';
        case 'contract' : return type + ' fa-file-signature';

        case 'order' : return type + ' fa-file-check';
        case 'invoice' : return type + ' fa-file-invoice-dollar';
        case 'card' : return type + ' fa-address-card';
        case 'problem' : return type + ' fa-exclamation-triangle';
        case 'follow' : return type + ' fa-balance-scale';
        case 'history' : return type + ' fa-history';

        case 'member-team' : return type + ' fa-user-friends';
        case 'member-internal' : return type + ' fa-house-user';
        case 'member-prod' : return type + ' fa-user-cog';
        case 'member-internship' : return type + ' fa-user-graduate';
        case 'member-external' : return type + ' fa-user-times';
        case 'member-out' : return type + ' fa-user-slash';

        case 'parent' : return type + ' fa-directions';
        case 'booked' : return type + ' fa-cart-plus';
        case 'free' : return type + ' fa-shopping-cart';
        case 'progress' : return type + ' fa-spinner';
        case 'wait' : return type + ' fa-hourglass';
        case 'stop' : return type + ' fa-traffic-light-stop';
        case 'done' : return type + ' fa-clipboard-check';

        case 'chart' : return type + ' fa-chart-line';
        case 'kpi' : return type + ' fa-tachometer';
        case 'home' : return type + ' fa-home';
        case 'construction' : return type + ' fa-construction';
        case 'camping' : return type + ' fa-campground';
        case 'caravan' : return type + ' fa-caravan';
        case 'water' : return type + ' fa-faucet';
        case 'elec' : return type + ' fa-charging-station';
        case 'shower' : return type + ' fa-shower';
        case 'toilet' : return type + ' fa-toilet-paper';
        case 'aid' : return type + ' fa-first-aid';
        case 'sea' : return type + ' fa-swimmer';
        case 'tree' : return type + ' fa-tree';
    }
    return '';
    }
}
