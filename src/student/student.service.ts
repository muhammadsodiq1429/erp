import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { email, phone, password, confirm_password } = createStudentDto;
    if (await this.findAny({ email: email }))
      throw new ConflictException(`Student already exists with email ${email}`);
    if (await this.findAny({ email: phone }))
      throw new ConflictException(`Student already exists with phone ${phone}`);
    if (password !== confirm_password)
      throw new BadRequestException("Passwords don't match");

    const hashed_password = await bcrypt.hash(password, 7);
    const newStudent = await this.studentRepo.save({
      ...createStudentDto,
      hashed_password,
    });

    return {
      success: true,
      message: "Student successfully created",
      newStudentId: newStudent.id,
    };
  }

  findAny(any: object) {
    return this.studentRepo.findOneBy(any);
  }
  async findAll() {
    const allStudents = await this.studentRepo.find();
    if (allStudents.length === 0)
      throw new NotFoundException("Students not found");

    return { success: true, allStudents };
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student)
      throw new NotFoundException(`Student not found with ID ${id}`);

    return { success: true, student };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const updatedStudent = await this.studentRepo.preload({
      id,
      ...updateStudentDto,
    });
    if (!updatedStudent)
      throw new NotFoundException(`Student not found with ID ${id}`);
    await this.studentRepo.save(updatedStudent);
    return {
      success: true,
      message: "Student successfully updated",
      updatedStudent,
    };
  }

  updateRefreshToken(student: Student, refreshToken: string) {
    return this.studentRepo.update(student.id, {
      hashed_refresh_token: refreshToken,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.studentRepo.delete({ id: id });

    return { success: true, message: "Student successfully deleted", id };
  }
}
