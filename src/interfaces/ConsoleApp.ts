import { Course } from '../domain/Course';
import { CourseService } from '../application/CourseService';
import * as readline from 'readline';
import { v4 as uuidv4 } from 'uuid';

export class ConsoleApp {
  constructor(private courseService: CourseService) {}

  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async start() {
    console.log('Bienvenido al sistema de gestión de cursos en línea');
    let exit = false;
    while (!exit) {
      console.log('\nOpciones:');
      console.log('1. Listar cursos');
      console.log('2. Ver curso por ID');
      console.log('3. Crear curso');
      console.log('4. Actualizar curso');
      console.log('5. Eliminar curso');
      console.log('0. Salir');
      const opt = await this.ask('Selecciona una opción: ');
      switch (opt) {
        case '1':
          await this.listCourses();
          break;
        case '2':
          await this.viewCourse();
          break;
        case '3':
          await this.createCourse();
          break;
        case '4':
          await this.updateCourse();
          break;
        case '5':
          await this.deleteCourse();
          break;
        case '0':
          exit = true;
          break;
        default:
          console.log('Opción no válida.');
      }
    }
    this.rl.close();
  }

  private ask(query: string): Promise<string> {
    return new Promise(resolve => this.rl.question(query, resolve));
  }

  private async listCourses() {
    const courses = await this.courseService.getAllCourses();
    if (courses.length === 0) {
      console.log('No hay cursos registrados.');
      return;
    }
    courses.forEach(c => {
      console.log(`ID: ${c.id} | Título: ${c.title} | Instructor: ${c.instructor}`);
    });
  }

  private async viewCourse() {
    const id = await this.ask('ID del curso: ');
    const course = await this.courseService.getCourseById(id);
    if (!course) {
      console.log('Curso no encontrado.');
      return;
    }
    console.log(course);
  }

  private async createCourse() {
    const title = await this.ask('Título: ');
    const description = await this.ask('Descripción: ');
    const instructor = await this.ask('Instructor: ');
    const course: Course = {
      id: uuidv4(),
      title,
      description,
      instructor,
      createdAt: new Date(),
    };
    await this.courseService.createCourse(course);
    console.log('Curso creado exitosamente.');
  }

  private async updateCourse() {
    const id = await this.ask('ID del curso a actualizar: ');
    const existing = await this.courseService.getCourseById(id);
    if (!existing) {
      console.log('Curso no encontrado.');
      return;
    }
    const title = await this.ask(`Título (${existing.title}): `) || existing.title;
    const description = await this.ask(`Descripción (${existing.description}): `) || existing.description;
    const instructor = await this.ask(`Instructor (${existing.instructor}): `) || existing.instructor;
    const updated: Course = {
      ...existing,
      title,
      description,
      instructor,
    };
    await this.courseService.updateCourse(updated);
    console.log('Curso actualizado exitosamente.');
  }

  private async deleteCourse() {
    const id = await this.ask('ID del curso a eliminar: ');
    await this.courseService.deleteCourse(id);
    console.log('Curso eliminado exitosamente.');
  }
} 