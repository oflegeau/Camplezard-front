import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'isDateNotNullPipe'})
export class IsDateNotNullPipe implements PipeTransform {
  constructor() {
  }

  transform(valeur: Date) {
    if (new Date(valeur).getFullYear() === 2100) {
      return '...';
    } else {
      return new Date(valeur).toDateString();
    }
  }
}

@Pipe({name: 'divBy10Pipe'})
export class DivBy10Pipe implements PipeTransform {
  constructor() {
  }

  transform(val: number) {
    const a = val / 10;
    return a.toString(10);
  }
}

@Pipe({name: 'divBy100Pipe'})
export class DivBy100Pipe implements PipeTransform {
  constructor() {
  }

  transform(val: number) {
    const a = val / 100;
    return a.toString(10);
  }
}
