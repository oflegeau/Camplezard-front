export class DeleteConfirmation {
    public isCertified: boolean;
    public title: string;
    public message: string;
    public returnCode: number;

    constructor(isCertified: boolean, title: string, message: string, returnCode: number) {
        this.isCertified = isCertified;
        this.title = title;
        this.message = message;
        this.returnCode = returnCode;
    }
}
