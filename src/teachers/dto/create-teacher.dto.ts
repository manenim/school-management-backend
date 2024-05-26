import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { IsNull, PrimaryGeneratedColumn } from 'typeorm';

export class CreateTeacherDto {

    @PrimaryGeneratedColumn('increment')
    id: number

  @IsNotEmpty()
  @IsString()
  @MinLength(11, {
    message: 'National ID number must be at least 11 characters',
  })
  nationalId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Surname must be at least 2 characters long' })
  surname: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Teacher number must be at least 6 characters long',
  })
  teacherNumber: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  salary: number;
}
