import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  Max,
  IsOptional,
} from 'class-validator';

@Entity()
export class Student {
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
    message: 'Student number must be at least 6 characters long',
  })
  studentNumber: string;

  @BeforeInsert()
  @BeforeUpdate()
  validateAge() {
    const today = new Date();
    const birthYear = this.dateOfBirth.getFullYear();
    const age = today.getFullYear() - birthYear;
    if (age > 22) {
      throw new Error('Student must be less than or equal to 22 years old');
    }
  }
}
