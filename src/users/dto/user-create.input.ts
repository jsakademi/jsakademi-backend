import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New User Input' })
export class UserCreateInput {
  @Field({ description: 'First name of the user and required' })
  @MaxLength(30)
  firstName: string;

  @Field({ description: 'Last Name of the user and required' })
  @MaxLength(30)
  lastName: string;

  @Field({ description: 'Email is required for new user and it should be unique, server will not create new user if given email is already taken' })
  email: string;

  @Field({
    nullable: true,
    description: 'Biography of the user, it is optional and can be between 30 to 255 chars',
  })
  @IsOptional()
  @Length(30, 255)
  bio?: string;

  @Field({
    nullable: true,
    description: 'Avatar url of the user, it is optional',
  })
  @IsOptional()
  avatar?: string;
}
