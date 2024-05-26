import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(11, {
    message: 'National ID number must be at least 11 characters',
  })
  nationalId: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Surname must be at least 2 characters long' })
  surname: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Teacher number must be at least 6 characters long',
  })
  teacherNumber: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salary: number;

  @BeforeInsert()
  @BeforeUpdate()
  validateAge() {
    const today = new Date();
    const birthYear = this.dateOfBirth.getFullYear();
    const age = today.getFullYear() - birthYear;
    if (age < 21) {
      throw new Error('Teacher must be at least 21 years old');
    }
  }
}
