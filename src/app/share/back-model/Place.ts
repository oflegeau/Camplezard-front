import {TimeSlot} from './TimeSlot';

export class Place {
    public id: string;
    public code: string;
    public type: number;

    constructor(id: string, code: string, type: number) {
        this.id = id;
        this.code = code;
        this.type = type;
    }
}

export class PlaceCard extends Place {
    public comment: string;
    public line: number;
    public zone: number;
    public status: number;
    public famous: number;
    public price: number;
    public van: boolean;
    public water: boolean;
    public elect: boolean;

    // tslint:disable-next-line:max-line-length
    constructor(id: string, code: string, type: number, comment: string, line: number, zone: number, status: number, famous: number, price: number, van: boolean, water: boolean, elect: boolean) {
        super(id, code, type);
        this.comment = comment;
        this.line = line;
        this.zone = zone;
        this.status = status;
        this.famous = famous;
        this.price = price;
        this.van = van;
        this.water = water;
        this.elect = elect;
    }
}


export class PlaceSlot extends Place {
    public timeSlots: TimeSlot[];

    constructor(id: string, code: string, type: number, timeSlots: TimeSlot[]) {
        super(id, code, type);
        this.timeSlots = timeSlots;
    }
}
