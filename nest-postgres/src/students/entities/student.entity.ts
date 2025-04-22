import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from './grade.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { array: true })
  subjects: string[];

  @Column('text')
  gender: string;

  @Column('text', { unique: true, nullable: true })
  nickname?: string;

  @OneToMany(
    () => Grade,
    (grade) => grade.student, // Note: This assumes that the Grade entity has a 'student' property that references the Student entity
    { cascade: true, eager: true }, // Cascade operations to grades and eager load them
  )
  grades?: Grade[];

  @BeforeInsert()
  checkNickNameInsert() {
    if (!this.nickname) {
      this.nickname = this.name;
    }

    this.nickname = this.nickname.toLowerCase().replace(' ', '_') + this.age;
  }
}
