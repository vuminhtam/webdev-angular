import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) {
  }

  user = {};
  username;
  password;
  sections = [];

  update(user) {
    alert('not implemented');
    console.log(user);
  }

  unenroll(section) {
    this.sectionService
      .unenrollStudentFromSection(section._id)
      .then(() => this.loadSections());
  }

  loadSections() {
    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  updateInfo(user) {
    this.user = user;
    this.username = user.username;
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user =>
        this.updateInfo(user));

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }

}
