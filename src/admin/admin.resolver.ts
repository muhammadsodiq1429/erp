import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Admin } from "./entities/admin.entity";

@Resolver("admin")
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  createAdmin(@Args("createAdminDto") createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Query(() => [Admin])
  findAllAdmin() {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminService.findOne(+id);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => ID }) id: string,
    @Args("updateAdminDto") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Mutation(() => Number)
  removeAdmin(@Args("id", { type: () => ID }) id: string) {
    return this.adminService.remove(+id);
  }
}
