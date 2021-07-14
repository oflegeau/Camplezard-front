import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'isRoleAdmin'})
export class IsRoleAdminPipe implements PipeTransform {
  constructor() {
  }

  transform(type: number): boolean {
    if (type === 4) {
      return true;
    }
    return false;
  }
}

@Pipe({name: 'isRoleManager'})
export class IsRoleManagerPipe implements PipeTransform {
  constructor() {
  }

  transform(type: number): boolean {
    if (type === 3) {
      return true;
    }
    return false;
  }
}

@Pipe({name: 'isRoleMember'})
export class IsRoleMemberPipe implements PipeTransform {
  constructor() {
  }

  transform(type: number): boolean {
    if (type === 2) {
      return true;
    }
    return false;
  }
}

@Pipe({name: 'isRoleUser'})
export class IsRoleUserPipe implements PipeTransform {
  constructor() {
  }

  transform(param: number): boolean {
    if (param === 1) {
      return true;
    }

    return false;
  }
}

@Pipe({name: 'isBinary'})
export class IsBinaryPipe implements PipeTransform {
  constructor() {
  }

  transform(param: number, position: number): boolean {
    const test = Math.pow(2, position);
    // tslint:disable-next-line:no-bitwise
    const i = param & test;
    return test === i;
  }
}

@Pipe({name: 'isBinaryColor'})
export class IsBinaryColorPipe implements PipeTransform {
  constructor() {
  }

  transform(param: number, position: number): string {
    const test = Math.pow(2, position);
    // tslint:disable-next-line:no-bitwise
    const i = param & test;
    if (test === i) {
      return 'pink-text';
    }
    return 'dark-grey-text';
  }
}

