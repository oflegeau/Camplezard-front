export class Reponse {

  public ok: boolean;
  public message: string;
  public code: number;
  public ids: string;
  public idn: number;

  constructor(ok: boolean, message: string, code: number, ids: string, idn: number) {
    this.ok = ok;
    this.message = message;
    this.code = code;
    this.ids = ids;
    this.idn = idn;
  }

  static simpleClone(obj: any) {
    return Object.assign({}, obj);
  }

  static formatDate(iDate: Date) {
    const inputDate = new Date(iDate);
    const y = inputDate.getFullYear();
    const m = inputDate.getMonth() + 1;
    let mm = '';
    if (m < 10) {
      mm = '0' + m.toString();
    } else {
      mm = m.toString();
    }
    const d = inputDate.getDate();
    let dd = '';
    if (d < 10) {
      dd = '0' + d.toString();
    } else {
      dd = d.toString();
    }

    return y + '-' + mm + '-' + dd;
  }
}
