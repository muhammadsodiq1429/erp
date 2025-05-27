import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  @Field()
  confirm_password: string;

  @Field()
  phone: string;

  @Field({ nullable: true, defaultValue: false })
  is_superadmin: boolean;

  @Field({ nullable: true, defaultValue: true })
  is_active: boolean;
}
