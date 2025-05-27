import { Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  lessons_is_a_week: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  lesson_duration: string;
}
