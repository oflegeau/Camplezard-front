
export class TimeSlot {
    public id: string;
    public day: Date;
    public status: number;

    constructor(id: string, day: Date, status: number) {
        this.id = id;
        this.day = day;
        this.status = status;
    }
}
