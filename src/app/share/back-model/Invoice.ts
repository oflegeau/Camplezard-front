
export class InvoiceLine {
    public id: number;
    public design: string;
    public libelle: string;
    public quantity: number;
    public price: number;
    public vat: number;

    constructor(id: number, design: string, libelle: string, quantity: number, price: number, vat: number) {
        this.id = id;
        this.design = design;
        this.libelle = libelle;
        this.quantity = quantity;
        this.price = price;
        this.vat = vat;
    }
}

export class Invoice {
    public id: number;
    public code: string;
    public libelle: string;
    public status: number;
    public created: Date;
    public lines: InvoiceLine[];
    public totalGross: number;
    public totalVat: number;
    public totalNet: number;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, code: string, libelle: string, status: number, created: Date, lines: InvoiceLine[], totalGross: number, totalVat: number, totalNet: number) {
        this.id = id;
        this.code = code;
        this.libelle = libelle;
        this.status = status;
        this.created = created;
        this.lines = lines;
        this.totalGross = totalGross;
        this.totalVat = totalVat;
        this.totalNet = totalNet;
    }
}
