export class Connect {
  public id: string;
  public role: number;
  public email: string;
  public phone: string;
  public name: string;
  public surname: string;
  public emailVerified: boolean;
  public created: Date;
  public lastConnexion: Date;
  public idCompany: string;
  public idMember: string;
  public avatar: string;

  // tslint:disable-next-line:max-line-length
  constructor(id: string, role: number, email: string, phone: string, name: string, surname: string, emailVerified: boolean, created: Date, lastConnexion: Date, idCompany: string, idMember: string, avatar: string) {
    this.id = id;
    this.role = role;
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.surname = surname;
    this.emailVerified = emailVerified;
    this.created = created;
    this.lastConnexion = lastConnexion;
    this.idCompany = idCompany;
    this.idMember = idMember;
    this.avatar = avatar;
  }
}
