import {Connect} from './Connect';

export class Member {
  public id: string;
  public name: string;
  public surname: string;

  constructor(id: string, name: string, surname: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
  }
}

// ---------------------------- herite MemberList ------------------------------------------ //

export class MemberPhoto extends Member {
  public photo: string;
  public created: Date;

  public connect: Connect;

  // tslint:disable-next-line:max-line-length
  constructor(id: string, name: string, surname: string, photo: string, created: Date) {
    super(id, name, surname);
    this.photo = photo;
    this.created = created;
  }
}

// ---------------------------- herite MemberPhoto / MemberList ------------------------------------------ //

export class MemberCard extends MemberPhoto {

  public email: string;
  public phone: string;
  public connected: boolean;
  public nation: number;
  public birthday: Date;
  public sex: boolean;
  public address: string;
  public code: string;
  public city: string;
  public connect: Connect

  // tslint:disable-next-line:max-line-length
  constructor(id: string, name: string, surname: string, photo: string, created: Date, email: string, phone: string, connected: boolean, nation: number, birthday: Date, sex: boolean, address: string, code: string, city: string, connect: Connect) {
    super(id, name, surname, photo, created);
    this.email = email;
    this.phone = phone;
    this.connected = connected;
    this.nation = nation;
    this.birthday = birthday;
    this.sex = sex;
    this.address = address;
    this.code = code;
    this.city = city;
    this.connect = connect;
  }
}
