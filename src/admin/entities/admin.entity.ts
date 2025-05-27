import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Admin {
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

  @Field({ nullable: true, defaultValue: false })
  @Column({ nullable: true, default: false })
  is_superadmin: boolean;

  @Field({ nullable: true, defaultValue: true })
  @Column({ nullable: true, default: true })
  is_active: boolean;
}
