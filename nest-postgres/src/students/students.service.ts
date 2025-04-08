import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../commons/dto/pagination.dto';
import { isUUID } from 'class-validator';

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
      this.logger.error(error.detail);
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

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      return await this.studentRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.logger.error(error.detail);
      this.handleError(error);
    }
  }

  async findOne(term: string) {
    let student: Student | null;

    if (isUUID(term)) {
      student = await this.studentRepository.findOneBy({ id: term });
    } else {
      //student = await this.studentRepository.findOneBy({ nickname: term });
      /** Crear un querybuilder, preprar consulta y enviar un query */
      const query = this.studentRepository.createQueryBuilder('student');
      student = await query
        .where('UPPER(name) = :name or nickname= :nickname', {
          name: term.toUpperCase(),
          nickname: term.toLowerCase(),
        })
        .getOne();
    }
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({
      id: id,
      ...updateStudentDto,
    });
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
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
