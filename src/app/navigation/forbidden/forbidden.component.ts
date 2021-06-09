import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/guard/auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onDeco() {
    this.authService.signOutAccount();
  }
}
