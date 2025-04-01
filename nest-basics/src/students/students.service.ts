import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentsService {
  private students = [
    {
      id: 1,
      name: 'Gus',
      age: 35,
    },
    {
      id: 2,
      name: 'Colonia',
      age: 22,
    },
    {
      id: 3,
      name: 'Mor',
      age: 19,
    },
  ];

  getStudentById(id: number) {
    const student = this.students.find((student) => student.id === id);
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  getAllStudents() {
    return this.students;
  }

  updateStudent(id: number, student: any) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id,
    );
    this.students[studentIndex] = student;
    return student;
  }
}
