

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try{
    const newTeacher = new Teacher();
    newTeacher.nationalId = createTeacherDto.nationalId;
    newTeacher.title = createTeacherDto.title;
    newTeacher.name = createTeacherDto.name;
    newTeacher.surname = createTeacherDto.surname;
    newTeacher.dateOfBirth = new Date(createTeacherDto.dateOfBirth);
    newTeacher.teacherNumber = createTeacherDto.teacherNumber;
    newTeacher.salary = createTeacherDto.salary;

    // await newTeacher.save();
    // return newTeacher;
    const savedTeacher = await this.teacherRepository.save(newTeacher);
    return savedTeacher;
  }
    catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: number): Promise<Teacher> {
    return await this.teacherRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateTeacherDto: CreateTeacherDto,
  ): Promise<Teacher> {
    try{
    const teacher = await this.teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    teacher.nationalId = updateTeacherDto.nationalId;
    teacher.title = updateTeacherDto.title;
    teacher.name = updateTeacherDto.name;
    teacher.surname = updateTeacherDto.surname;
    teacher.dateOfBirth = new Date(updateTeacherDto.dateOfBirth);
    teacher.teacherNumber = updateTeacherDto.teacherNumber;
    teacher.salary = updateTeacherDto.salary;

    // await teacher.save();
    // return teacher;
    const savedTeacher = await this.teacherRepository.save(teacher);
    return teacher;
    
  }
    catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }

  async createMany(createTeacherDtos: CreateTeacherDto[]): Promise<Teacher[]> {
    const teachers = createTeacherDtos.map((dto) => ({ ...dto }));
    const createdTeachers = await this.teacherRepository.save(teachers);
    return createdTeachers;
  }
}
