import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../share/guard/auth.service';
import {Connect} from '../../share/back-model/Connect';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  public connect: Connect;
  public changePhoto: boolean;

  constructor(private authService: AuthService) {
    this.changePhoto = false;
    this.connect = JSON.parse(localStorage.getItem('connect'));
  }

  ngOnInit() {
    console.log('here');
   this.changePhoto = false;
  }

  onChange()  {
    this.changePhoto = !this.changePhoto;
  }

  getOutputPhoto(event: string) {
    this.changePhoto = false;
    if (event !== '')  {
      this.authService.changePhotoUser(event).then(rep => {
        if (rep === true) {
          this.connect = JSON.parse(localStorage.getItem('connect'));
        }
      });
    }
  }
}
