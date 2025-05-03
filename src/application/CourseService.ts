import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';

export class CourseService {
  constructor(private courseRepo: CourseRepository) {}

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepo.getAll();
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.courseRepo.getById(id);
  }

  async createCourse(course: Course): Promise<void> {
    return this.courseRepo.create(course);
  }

  async updateCourse(course: Course): Promise<void> {
    return this.courseRepo.update(course);
  }

  async deleteCourse(id: string): Promise<void> {
    return this.courseRepo.delete(id);
  }
} 