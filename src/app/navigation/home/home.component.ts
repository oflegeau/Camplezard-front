import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/guard/auth.service';
import {Connect} from '../../service/model/Connect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public connect: Connect;

  constructor(private authService: AuthService) {
    this.connect = null;
    this.authService.getUser().subscribe(connect => {
      if (connect) {
        this.connect = connect;
      } else {
        this.connect = null;
      }
    });
  }

  ngOnInit() {
  }

}
