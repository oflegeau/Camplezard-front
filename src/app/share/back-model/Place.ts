import {Member} from './MemberCard';

export class Place {
    public id: string;
    public code: string;
    public type: number;
    public line: number;
    public zone: number;
    public status: number;
    public famous: number;
    public avis: number;
    public price: number;
    public photo: string;
    public video: string;
    public van: boolean;
    public water: boolean;
    public elect: boolean;
    public member: Member;

    // tslint:disable-next-line:max-line-length
    constructor(id: string, code: string, type: number, line: number, zone: number, status: number, famous: number, avis: number, price: number, photo: string, video: string, van: boolean, water: boolean, elect: boolean, member: Member) {
        this.id = id;
        this.code = code;
        this.type = type;
        this.line = line;
        this.zone = zone;
        this.status = status;
        this.famous = famous;
        this.avis = avis;
        this.price = price;
        this.photo = photo;
        this.video = video;
        this.van = van;
        this.water = water;
        this.elect = elect;
        this.member = member;
    }
}
