export class MemberWith {
    public id: string;
    public name: string;
    public surname: string;
    public boolean: boolean;
    public birthday: Date;

    constructor(id: string, name: string, surname: string, boolean: boolean, birthday: Date) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.boolean = boolean;
        this.birthday = birthday;
    }
}

