import {Resa} from './Resa';

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
  public nation: number;
  public birthday: Date;
  public birthdayCity: string;
  public profession: string;
  public sex: boolean;
  public address: string;
  public code: string;
  public city: string;
  public carType: string;
  public carNumber: string;
  public comment: string;
  public here: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(id: string, name: string, surname: string, photo: string, created: Date, email: string, phone: string, nation: number, birthday: Date, birthdayCity: string, profession: string, sex: boolean, address: string, code: string, city: string, carType: string, carNumber: string, comment: string, here: boolean) {
    super(id, name, surname, photo, created);
    this.email = email;
    this.phone = phone;
    this.nation = nation;
    this.birthday = birthday;
    this.birthdayCity = birthdayCity;
    this.profession = profession;
    this.sex = sex;
    this.address = address;
    this.code = code;
    this.city = city;
    this.carType = carType;
    this.carNumber = carNumber;
    this.comment = comment;
    this.here = here;
  }
}

export class MemberResa extends MemberCard {
  public resas: Resa[];

  // tslint:disable-next-line:max-line-length
  constructor(id: string, name: string, surname: string, photo: string, created: Date, email: string, phone: string, nation: number, birthday: Date, birthdayCity: string, profession: string, sex: boolean, address: string, code: string, city: string, carType: string, carNumber: string, comment: string, resas: Resa[]) {
    // tslint:disable-next-line:max-line-length
    super(id, name, surname, photo, created, email, phone, nation, birthday, birthdayCity, profession, sex, address, code, city, carType, carNumber, comment);
    this.resas = resas;
  }
}
