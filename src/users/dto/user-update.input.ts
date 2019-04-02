import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update User Input' })
export class UserUpdateInput {
  @Field({
    nullable: true,
    description: 'First name of the user',
  })
  @MaxLength(30)
  firstName?: string;

  @Field({
    nullable: true,
    description: 'Last Name of the user',
  })
  @MaxLength(30)
  lastName?: string;

  @Field({
    nullable: true,
    description: 'Email can be updated but it should be unique, server will not update user if given email is already taken',
  })
  email?: string;

  @Field({
    nullable: true,
    description: 'Biography of the user, it can be between 30 to 255 chars',
  })
  @IsOptional()
  @Length(30, 255)
  bio?: string;

  @Field({
    nullable: true,
    description: 'Avatar url of the user',
  })
  @IsOptional()
  avatar?: string;
}
