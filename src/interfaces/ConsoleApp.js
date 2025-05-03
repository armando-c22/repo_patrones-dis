"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleApp = void 0;
const readline = __importStar(require("readline"));
const uuid_1 = require("uuid");
class ConsoleApp {
    constructor(courseService) {
        this.courseService = courseService;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
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
                const opt = yield this.ask('Selecciona una opción: ');
                switch (opt) {
                    case '1':
                        yield this.listCourses();
                        break;
                    case '2':
                        yield this.viewCourse();
                        break;
                    case '3':
                        yield this.createCourse();
                        break;
                    case '4':
                        yield this.updateCourse();
                        break;
                    case '5':
                        yield this.deleteCourse();
                        break;
                    case '0':
                        exit = true;
                        break;
                    default:
                        console.log('Opción no válida.');
                }
            }
            this.rl.close();
        });
    }
    ask(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }
    listCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield this.courseService.getAllCourses();
            if (courses.length === 0) {
                console.log('No hay cursos registrados.');
                return;
            }
            courses.forEach(c => {
                console.log(`ID: ${c.id} | Título: ${c.title} | Instructor: ${c.instructor}`);
            });
        });
    }
    viewCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.ask('ID del curso: ');
            const course = yield this.courseService.getCourseById(id);
            if (!course) {
                console.log('Curso no encontrado.');
                return;
            }
            console.log(course);
        });
    }
    createCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            const title = yield this.ask('Título: ');
            const description = yield this.ask('Descripción: ');
            const instructor = yield this.ask('Instructor: ');
            const course = {
                id: (0, uuid_1.v4)(),
                title,
                description,
                instructor,
                createdAt: new Date(),
            };
            yield this.courseService.createCourse(course);
            console.log('Curso creado exitosamente.');
        });
    }
    updateCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.ask('ID del curso a actualizar: ');
            const existing = yield this.courseService.getCourseById(id);
            if (!existing) {
                console.log('Curso no encontrado.');
                return;
            }
            const title = (yield this.ask(`Título (${existing.title}): `)) || existing.title;
            const description = (yield this.ask(`Descripción (${existing.description}): `)) || existing.description;
            const instructor = (yield this.ask(`Instructor (${existing.instructor}): `)) || existing.instructor;
            const updated = Object.assign(Object.assign({}, existing), { title,
                description,
                instructor });
            yield this.courseService.updateCourse(updated);
            console.log('Curso actualizado exitosamente.');
        });
    }
    deleteCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.ask('ID del curso a eliminar: ');
            yield this.courseService.deleteCourse(id);
            console.log('Curso eliminado exitosamente.');
        });
    }
}
exports.ConsoleApp = ConsoleApp;
