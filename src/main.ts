import { FileCourseRepository } from './infrastructure/FileCourseRepository';
import { CourseService } from './application/CourseService';
import { ConsoleApp } from './interfaces/ConsoleApp';

async function main() {
  const repo = new FileCourseRepository();
  const service = new CourseService(repo);
  const app = new ConsoleApp(service);
  await app.start();
}

main(); 