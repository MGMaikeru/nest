import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  age: number;

  @IsString({ each: true })
  @IsArray()
  subjects: string[];

  @IsString()
  email: string;

  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsString()
  @IsOptional()
  nickname: string;
}
