import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient) { }

  user = {};
  courses: Course[] = [];
  sections = [];
  ngOnInit() {
    this.userService
      .profile()
      .then(user =>
        this.user = user);
    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }
  checkEnrolledInCourse(courseId) {
    console.log(this.sections);
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].section.courseId === courseId) {
        return true;
      }
    }
    return false;
  }
}
