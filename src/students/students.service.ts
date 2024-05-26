import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const newStudent = new Student();
      newStudent.nationalId = createStudentDto.nationalId;
      newStudent.name = createStudentDto.name;
      newStudent.surname = createStudentDto.surname;
      newStudent.dateOfBirth = new Date(createStudentDto.dateOfBirth);
      newStudent.studentNumber = createStudentDto.studentNumber;

      // await newStudent.save();
      // return newStudent;
      const savedStudent = await this.studentRepository.save(newStudent);
      return savedStudent;
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    let student = await this.studentRepository.findOne({ where: { id } });

    
    return student
  }

  async update(
    id: number,
    updateStudentDto: CreateStudentDto,
  ): Promise<Student | any> {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) {
        throw new Error('Student not found');
      }
      student.nationalId = updateStudentDto.nationalId;
      student.name = updateStudentDto.name;
      student.surname = updateStudentDto.surname;
      student.dateOfBirth = new Date(updateStudentDto.dateOfBirth);
      student.studentNumber = updateStudentDto.studentNumber;

      // await student.save();
      // return student;
      const savedStudent = await this.studentRepository.save(student);
      return savedStudent;
    }
    catch (err) {
      throw new BadRequestException(err.message )
    }
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete({id});
  }
}
