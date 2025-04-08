import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
