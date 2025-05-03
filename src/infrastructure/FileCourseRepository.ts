import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { promises as fs } from 'fs';
import * as path from 'path';

const DATA_FILE = path.join(__dirname, '../../courses.json');

export class FileCourseRepository implements CourseRepository {
  private async readData(): Promise<Course[]> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data) as Course[];
    } catch (e) {
      return [];
    }
  }

  private async writeData(courses: Course[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(courses, null, 2), 'utf-8');
  }

  async getAll(): Promise<Course[]> {
    return this.readData();
  }

  async getById(id: string): Promise<Course | null> {
    const courses = await this.readData();
    return courses.find(c => c.id === id) || null;
  }

  async create(course: Course): Promise<void> {
    const courses = await this.readData();
    courses.push(course);
    await this.writeData(courses);
  }

  async update(course: Course): Promise<void> {
    const courses = await this.readData();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx === -1) throw new Error('Course not found');
    courses[idx] = course;
    await this.writeData(courses);
  }

  async delete(id: string): Promise<void> {
    const courses = await this.readData();
    const filtered = courses.filter(c => c.id !== id);
    await this.writeData(filtered);
  }
} 