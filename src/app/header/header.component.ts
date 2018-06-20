import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: UserServiceClient, private router: Router) {
  }

  user = {};
  loggedin = false;

  ngOnInit() {
    this.service
      .profile()
      .then(user => {
        this.user = user;
        if (user !== undefined) {
          this.loggedin = true;
        }
      });
  }

  logout() {
    this.service
      .logout()
      .then(() => {
          this.loggedin = false;
          this.router.navigate(['home']);
        }
      );
  }

  loggedIn() {
    return this.service
      .profile()
      .then(user => {
        console.log(user)
        this.user = user;
        if (user !== undefined) {
          this.loggedin = true;
          return true;
        } else {
          return false;
        }
      });
  }

}
