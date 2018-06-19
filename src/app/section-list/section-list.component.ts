import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private service: SectionServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  userRole = 'student';
  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  loadSections(courseId) {
    this.courseId = courseId;
    this
      .service
      .findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  createSection(sectionName, seats) {
    this
      .service
      .createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  enroll(section) {
    this.service
      .enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  ngOnInit() {
    this.userService
      .profile()
      .then(user => {
        if (user !== undefined) {
          this.userRole = user.userRole;
        }
      });
  }

  updateSectionList(courseId) {
    this.service
      .updateSectionList(courseId, this.sections)
      .then(() => this.loadSections(this.courseId));
  }

  deleteSection(sectionId) {
    const newList = this.sections.filter(section => (section._id !== sectionId));
    this.sections = newList;
  }
  setSectionName(editingSectionId, event: any) {
    if (event.target.value === '') {
      alert('Section name must not be empty');
    } else {
      this.sections.map(section => {
        if (section._id === editingSectionId) {
          section.name = event.target.value;
        }
      });
    }
  }

  setMaxSeat(editingSectionId, event: any) {
    if (event.target.value === '') {
      alert('Section seat capacity must not be empty');
    } else if (event.target.value === '0') {
      alert('Section seat capacity must be at least 1');
    } else {
      this.sections.map(section => {
        if (section._id === editingSectionId) {
          section.maxSeats = event.target.value;
        }
      });
    }
  }
}
