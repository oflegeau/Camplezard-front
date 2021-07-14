
import {Place} from './Place';

export class PagePlace {

    public items: Place[];
    public indexPage: number;
    public itemPerPage: number;
    public empty: boolean;
    public firstPage: boolean;
    public lastPage: boolean;
    public totalItem: number;
    public totalPage: number;
    public type: number[];

    // tslint:disable-next-line:max-line-length
    constructor(items: Place[], indexPage: number, itemPerPage: number, empty: boolean, firstPage: boolean, lastPage: boolean, totalItem: number, totalPage: number, type: number[]) {
        this.items = items;
        this.indexPage = indexPage;
        this.itemPerPage = itemPerPage;
        this.empty = empty;
        this.firstPage = firstPage;
        this.lastPage = lastPage;
        this.totalItem = totalItem;
        this.totalPage = totalPage;
        this.type = type;
    }
}
