import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(11, {
    message: 'National ID number must be at least 11 characters',
  })
  nationalId: string;

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
    message: 'Student number must be at least 6 characters long',
  })
  studentNumber: string;
}
