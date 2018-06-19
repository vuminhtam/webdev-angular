import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {

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
          this.router.navigate(['login']);
          this.loggedin = false;
        }
      );
  }

}
