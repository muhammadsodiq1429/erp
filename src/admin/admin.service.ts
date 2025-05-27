import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, phone, password, confirm_password } = createAdminDto;
    if (await this.findAny({ email: email }))
      throw new ConflictException(`Admin already exists with email ${email}`);
    if (await this.findAny({ email: phone }))
      throw new ConflictException(`Admin already exists with phone ${phone}`);
    if (password !== confirm_password)
      throw new BadRequestException("Passwords don't match");

    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminRepo.save({
      ...createAdminDto,
      hashed_password,
    });

    return {
      success: true,
      message: "Admin successfully created",
      newAdminId: newAdmin.id,
    };
  }

  findAny(any: object) {
    return this.adminRepo.findOneBy(any);
  }
  async findAll() {
    const allAdmins = await this.adminRepo.find();
    if (allAdmins.length === 0) throw new NotFoundException("Admins not found");

    return { success: true, allAdmins };
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) throw new NotFoundException(`Admin not found with ID ${id}`);

    return { success: true, admin };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepo.preload({
      id,
      ...updateAdminDto,
    });
    if (!updatedAdmin)
      throw new NotFoundException(`Admin not found with ID ${id}`);
    await this.adminRepo.save(updatedAdmin);
    return {
      success: true,
      message: "Admin successfully updated",
      updatedAdmin,
    };
  }

  updateRefreshToken(admin: Admin, refreshToken: string) {
    return this.adminRepo.update(admin.id, {
      hashed_refresh_token: refreshToken,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.adminRepo.delete({ id: id });

    return { success: true, message: "Admin successfully deleted", id };
  }
}
