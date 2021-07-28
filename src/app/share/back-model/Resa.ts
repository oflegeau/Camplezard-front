import {Invoice} from './Invoice';
import {MemberWith} from './MemberWith';

export class Resa {
    public id: string;
    public startDate: Date;
    public endDate: Date;
    public days: number;
    public identity: boolean;
    public identityType: string;
    public identityNum: string;
    public animals: boolean;
    public garage: boolean;
    public van: boolean;
    public car: boolean;
    public elect: boolean;
    public comment: string;

    public memberWiths: MemberWith[];
    public invoices: Invoice[];

    // tslint:disable-next-line:max-line-length
    constructor(id: string, startDate: Date, endDate: Date, days: number, identity: boolean, identityType: string, identityNum: string, animals: boolean, garage: boolean, van: boolean, car: boolean, elect: boolean, comment: string, memberWiths: MemberWith[], invoices: Invoice[]) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.days = days;
        this.identity = identity;
        this.identityType = identityType;
        this.identityNum = identityNum;
        this.animals = animals;
        this.garage = garage;
        this.van = van;
        this.car = car;
        this.elect = elect;
        this.comment = comment;
        this.memberWiths = memberWiths;
        this.invoices = invoices;
    }
}
