import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  username: string;
  @Column('text')
  password?: string;
  @Column('text', { unique: true })
  email: string;
  @Column('text')
  fullName: string;
  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['teacher'],
  })
  role: string[];
  createdAt: Date;
  updatedAt: Date;
}
