import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const newCourse = await this.courseRepo.save(createCourseDto);

    return { success: true, message: "Course created successfully" };
  }

  async findAll() {
    const allCourses = await this.courseRepo.find();
    if (allCourses.length === 0)
      throw new NotFoundException("Courses not found");

    return { success: true, allCourses };
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException("Course not found");

    return { success: true, course };
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const updatedCourse = await this.courseRepo.update({ id }, updateCourseDto);
  }

  async remove(id: number) {
    const Course = await this.courseRepo;
  }
}
