import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({name: 'sanitize'})
export class SanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({name: 'photoPipe'})
export class PhotoPipe implements PipeTransform {
  constructor() {
  }

  transform(photo: string) {
    let image = '';
    if (photo !== '') {
      image = photo;
    } else {
      image = '../assets/img/inconnu.jpg';
    }

    return image;
  }
}

@Pipe({name: 'logoPipe'})
export class LogoPipe implements PipeTransform {
  constructor() {
  }

  transform(photo: string, type: number) {
    let image = '';
    if (photo !== '') {
      image = photo;
    } else {
      if ((type === 1) || (type === 4)) {
        image = '../assets/img/logo.jpg';
      } else {
        image = '../assets/img/client.png';
      }
    }

    return image;
  }
}

