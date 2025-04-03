import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  logger = new Logger('StudentsService');
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(student);
      return student;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByName(name: string) {
    try {
      const student = await this.studentRepository.findOne({ where: { name } });
      if (!student) {
        throw new InternalServerErrorException('Student not found');
      }
      return student;
    } catch (error) {
      throw new InternalServerErrorException('Error finding student by name');
    }
  }

  findAll() {
    const students = this.studentRepository.find();
    if (!students) {
      throw new InternalServerErrorException('No students found');
    }
    return students;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  private handleError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'An error occurred while processing your request',
    );
  }
}
