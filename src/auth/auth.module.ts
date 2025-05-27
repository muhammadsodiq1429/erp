import { Module } from "@nestjs/common";
import { TeacherModule } from "../teacher/teacher.module";
import { AdminModule } from "../admin/admin.module";
import { TeacherService } from "./teacher/teacher.service";
import { TeacherController } from "./teacher/teacher.controller";
import { AdminService } from "./admin/admin.service";
import { AdminController } from "./admin/admin.controller";

@Module({
  imports: [AdminModule, TeacherModule],
  controllers: [TeacherController, AdminController],
  providers: [TeacherService, AdminService],
})
export class AuthModule {}
