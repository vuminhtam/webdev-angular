export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionById(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId;
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }
  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const section = this.findSectionById(sectionId);
    if (section != null && section.seats > 0) {
      const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
      return fetch(url, {
        method: 'post',
        credentials: 'include'
      });
    } else {
      alert('No more seats available');
    }
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const maxSeats = seats;
    const section = {courseId, name, seats, maxSeats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSectionList(courseId, newList) {
    fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'delete'
    });
    return fetch(this.SECTION_URL.replace('COURSEID', courseId) + '/addAll', {
      method: 'post',
      body: JSON.stringify(newList),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => alert('changes saved!'));
  }
}
