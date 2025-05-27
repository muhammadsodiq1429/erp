import { Field } from "@nestjs/graphql";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateStudentDto {
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
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @Field()
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsEnum({ MALE: "MALE", FEMALE: "FEMALE" })
  @IsNotEmpty()
  gender: "MALE" | "FEMALE";

  @Field()
  @IsDateString()
  @IsNotEmpty()
  date_of_birth: Date;

  @Field({ nullable: true, defaultValue: true })
  @IsBoolean()
  is_active: boolean;
}
