import {
  BadRequestException,
  ConflictException,
  Injectable,
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
    const teacher = await this.teacherRepo.find();
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherRepo;
  }

  async remove(id: number) {
    const teacher = await this.teacherRepo;
  }
}
