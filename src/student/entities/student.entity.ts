import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  hashed_password: string;

  @Column({ nullable: true })
  hashed_refresh_token: string;

  @Field()
  @Column({ unique: true })
  phone: string;

  @Field()
  @Column()
  gender: "MALE" | "FEMALE";

  @Field()
  @Column()
  date_of_birth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url: string;

  @Field({ nullable: true, defaultValue: true })
  @Column({ nullable: true, default: true })
  is_active: boolean;
}
