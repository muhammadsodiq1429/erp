import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { email, phone, password, confirm_password } = createTeacherDto;
    if (await this.findAny({ email: email }))
      throw new ConflictException(`Teacher already exists with email ${email}`);
    if (await this.findAny({ email: phone }))
      throw new ConflictException(`Teacher already exists with phone ${phone}`);
    if (password !== confirm_password)
      throw new BadRequestException("Passwords don't match");

    const hashed_password = await bcrypt.hash(password, 7);
    const newTeacher = await this.teacherRepo.save({
      ...createTeacherDto,
      hashed_password,
    });

    return {
      success: true,
      message: "Teacher successfully created",
      newTeacherId: newTeacher.id,
    };
  }

  findAny(any: object) {
    return this.teacherRepo.findOneBy(any);
  }
  async findAll() {
    const allTeachers = await this.teacherRepo.find();
    if (allTeachers.length === 0)
      throw new NotFoundException("Teachers not found");

    return { success: true, allTeachers };
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOneBy({ id });
    if (!teacher)
      throw new NotFoundException(`Teacher not found with ID ${id}`);

    return { success: true, teacher };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const updatedTeacher = await this.teacherRepo.preload({
      id,
      ...updateTeacherDto,
    });
    if (!updatedTeacher)
      throw new NotFoundException(`Teacher not found with ID ${id}`);
    await this.teacherRepo.save(updatedTeacher);
    return {
      success: true,
      message: "Teacher successfully updated",
      updatedTeacher,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.teacherRepo.delete({ id: id });

    return { success: true, message: "Teacher successfully deleted", id };
  }
}
