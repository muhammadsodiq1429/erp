import { Field, InputType } from "@nestjs/graphql";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

@InputType()
export class CreateAdminDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @Field()
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @Field({ nullable: true, defaultValue: false })
  @IsString()
  @IsNotEmpty()
  is_superadmin: boolean;

  @Field({ nullable: true, defaultValue: true })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
