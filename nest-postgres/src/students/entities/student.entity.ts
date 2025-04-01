import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //   @Column('text', { array: true })
  //   subjects: string[];

  @Column('text')
  gender: string;
}
