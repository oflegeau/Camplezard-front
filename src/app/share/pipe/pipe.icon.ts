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

        case 'import-cloud' : return type + ' fa-cloud-download';
        case 'import-file' : return type + ' fa-file-import';
        case 'import' : return type + ' fa-download';
        case 'export' : return type + ' fa-file-export';
        case 'send' : return type + ' fa-share-all';
        case 'scan' : return type + ' fa-file-search';

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
        case 'experience' : return type + ' fa-gem';
        case 'presence' : return type + ' fa-user-clock';

        case 'parttime' : return type + ' fa-badge-percent';
        case 'watch' : return 'tim-icons  icon-watch-time';
        case 'connect' : return type + ' fa-wifi';
        case 'disconnect' : return type + ' fa-wifi-slash';
        case 'city' : return type + ' fa-city';
        case 'code' : return type + ' fa-barcode';

        case 'amount' : return type + ' fa-money-check-edit-alt';
        case 'iteration' : return type + ' fa-sort-amount-down-alt';
        case 'calculate' : return type + ' fa-calculator';
        case 'off' : return type + ' fa-umbrella-beach';
        case 'ts-imported' : return type + ' fa-sync';
        case 'ts-assigned' : return type + ' fa-user-check';

        case 'ts' : return type + ' fa-calendar-alt';
        case 'ts-edit' : return type + ' fa-calendar-edit';
        case 'ts-check' : return type + ' fa-calendar-check';
        case 'ts-warning' : return type + ' fa-calendar-exclamation';
        case 'ts-error' : return type + ' fa-calendar-times';
        case 'ts-invoiced' : return type + ' fa-user-lock';

        case 'project' : return type + ' fa-briefcase';
        case 'project-time' : return type + ' fa-business-time';
        case 'project-daas' : return type + ' fa-tasks';
        case 'project-fixed' : return type + ' fa-fax';
        case 'struct' : return type + ' fa-anchor';
        case 'nf' : return type + ' fa-cloud-showers-heavy';

        case 'creation' : return type + ' fa-calendar';
        case 'start' : return type + ' fa-calendar-plus';
        case 'end' : return type + ' fa-calendar-times';
        case 'delivery' : return type + ' fa-calendar-check';
        case 'days' : return type + ' fa-calendar-day';
        case 'prod' : return type + ' fa-industry';

        case 'turnover' : return type + ' fa-sack-dollar';
        case 'invoiced' : return type + ' fa-envelope-open-dollar';
        case 'paid' : return type + ' fa-hand-holding-usd';
        case 'margin' : return type + ' fa-funnel-dollar';
        case 'cost' : return type + ' fa-donate';
        case 'contribute' : return type + ' fa-people-carry';

        case 'clients' : return type + ' fa-comments';
        case 'client' : return type + ' fa-comments-dollar';
        case 'prospect' : return type + ' fa-comments-alt-dollar';
        case 'action' : return type + ' fa-exclamation-square';
        case 'contact' : return type + ' fa-address-book';
        case 'proposal' : return type + ' fa-file-contract';

        case 'contract' : return type + ' fa-file-signature';
        case 'order' : return type + ' fa-file-check';
        case 'invoice' : return type + ' fa-file-invoice-dollar';
        case 'card' : return type + ' fa-address-card';

        case 'member-team' : return type + ' fa-user-friends';
        case 'member-internal' : return type + ' fa-house-user';
        case 'member-prod' : return type + ' fa-user-cog';
        case 'member-internship' : return type + ' fa-user-graduate';
        case 'member-external' : return type + ' fa-user-times';
        case 'member-out' : return type + ' fa-user-slash';

        case 'parent' : return type + ' fa-directions';
        case 'open' : return type + ' fa-cart-plus';
        case 'progress' : return type + ' fa-spinner';
        case 'wait' : return type + ' fa-hourglass';
        case 'stop' : return type + ' fa-traffic-light-stop';
        case 'done' : return type + ' fa-clipboard-check';

        case 'problem' : return type + ' fa-exclamation-triangle';
        case 'follow' : return type + ' fa-balance-scale';
        case 'follow-more' : return type + ' fa-balance-scale-left';
        case 'follow-less' : return type + ' fa-balance-scale-right';

        case 'history' : return type + ' fa-history';
        case 'chart' : return type + ' fa-chart-line';
        case 'kpi' : return type + ' fa-tachometer';

    }
    return '';
    }
}
