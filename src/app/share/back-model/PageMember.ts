import {MemberCard} from './Member';

export class PageMember {

  public items: MemberCard[];
  public indexPage: number;
  public itemPerPage: number;
  public empty: boolean;
  public firstPage: boolean;
  public lastPage: boolean;
  public sort: boolean;
  public totalItem: number;
  public totalPage: number;
  public type: number[];

  // tslint:disable-next-line:max-line-length
  constructor(items: MemberCard[], indexPage: number, itemPerPage: number, empty: boolean, firstPage: boolean, lastPage: boolean, sort: boolean, totalItem: number, totalPage: number, type: number[]) {
    this.items = items;
    this.indexPage = indexPage;
    this.itemPerPage = itemPerPage;
    this.empty = empty;
    this.firstPage = firstPage;
    this.lastPage = lastPage;
    this.sort = sort;
    this.totalItem = totalItem;
    this.totalPage = totalPage;
    this.type = type;
  }
}
