import {Connect} from './Connect';

export class PageConnect {

  public items: Connect[];
  public indexPage: number;
  public itemPerPage: number;
  public empty: boolean;
  public firstPage: boolean;
  public lastPage: boolean;
  public sort: boolean;
  public totalItem: number;
  public totalPage: number;

  constructor(items: Connect[], indexPage: number, itemPerPage: number, empty: boolean, firstPage: boolean, lastPage: boolean, sort: boolean, totalItem: number, totalPage: number) {
    this.items = items;
    this.indexPage = indexPage;
    this.itemPerPage = itemPerPage;
    this.empty = empty;
    this.firstPage = firstPage;
    this.lastPage = lastPage;
    this.sort = sort;
    this.totalItem = totalItem;
    this.totalPage = totalPage;
  }
}
