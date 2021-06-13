export class Connect {
  public idFront: string;
  public role: number;
  public emailVerified: boolean;
  public lastConnexion: Date;
  public email: string;
  public phone: string;
  public name: string;
  public surname: string;
  public created: Date;
  public photo: string;
  public nation: number;
  public birthday: Date;
  public sex: boolean;
  public address: string;
  public code: string;
  public city: string;

  // tslint:disable-next-line:max-line-length
  constructor(idFront: string, role: number, emailVerified: boolean, lastConnexion: Date, email: string, phone: string, name: string, surname: string, created: Date, photo: string, nation: number, birthday: Date, sex: boolean, address: string, code: string, city: string) {
    this.idFront = idFront;
    this.role = role;
    this.emailVerified = emailVerified;
    this.lastConnexion = lastConnexion;
    this.email = email;
    this.phone = phone;
    this.name = name;
    this.surname = surname;
    this.created = created;
    this.photo = photo;
    this.nation = nation;
    this.birthday = birthday;
    this.sex = sex;
    this.address = address;
    this.code = code;
    this.city = city;
  }
}
