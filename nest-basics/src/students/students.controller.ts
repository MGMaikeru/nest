import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/studentDto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('/sayHello')
  sayHello(): string {
    return 'Hello World!';
  }

  @Get('/:id')
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    const student = this.studentsService.getStudentById(id);
    return student;
  }

  @Get()
  getAllStudents() {
    const students = this.studentsService.getAllStudents();
    return students;
  }

  @Get('/getByQuery')
  getParamsByQuery(
    @Query('name') name: string,
    @Query('age', ParseIntPipe) age: number,
  ) {
    console.log('🚀 ~ StudentsController ~ age:', typeof age);

    return `Name: ${name}, Age: ${age}`;
  }

  @Post()
  createStudent(@Body() student: StudentDto) {
    return student;
  }

  @Put('/:id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: StudentDto,
  ) {
    const updatedStudent = this.studentsService.updateStudent(id, student);
    return updatedStudent;
  }
}
