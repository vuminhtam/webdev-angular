import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  login(username, password) {
    this.service
      .login(username, password)
      .then((response) => {
        if (response.status === 500) {
          alert('Invalid credentials');
        } else {
          this.router.navigate(['profile']);
        }
      });
  }

  constructor(private router: Router,
              private service: UserServiceClient) { }

  ngOnInit() {
  }

}
