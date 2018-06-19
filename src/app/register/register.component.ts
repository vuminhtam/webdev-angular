import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  password2;
  userRole;
  register(username, password, password2, userRole) {
    this.service
      .createUser(username, password, userRole)
      .then(() =>
        this.router.navigate(['profile']));
  }

  ngOnInit() {
  }

}
