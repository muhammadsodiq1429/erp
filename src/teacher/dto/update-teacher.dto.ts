import { PartialType } from "@nestjs/mapped-types";
import { CreateTeacherDto } from "./create-teacher.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @Field()
  first_name?: string;

  @Field()
  last_name?: string;

  @Field()
  email?: string;

  @Field()
  phone?: string;

  @Field()
  role?: string;

  @Field({ nullable: true, defaultValue: true })
  is_active?: boolean;
}
