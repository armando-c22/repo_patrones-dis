import { Course } from './Course';

export interface CourseRepository {
  getAll(): Promise<Course[]>;
  getById(id: string): Promise<Course | null>;
  create(course: Course): Promise<void>;
  update(course: Course): Promise<void>;
  delete(id: string): Promise<void>;
} 