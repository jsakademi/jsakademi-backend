import { IsOptional, Length, MaxLength, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New User Input' })
export class UserCreateInput {
  @Field({ description: 'First name of the user. It is required and should not be empty' })
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @Field({ description: 'Last Name of the user. It is required and should not be empty' })
  @IsNotEmpty()
  @MaxLength(30)
  lastName: string;

  @Field({ description: 'Email of the user. It should be unique and valid email, server will not create new user if given email is already taken' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({
    nullable: true,
    description: 'Biography of the user. It is optional but should be between 30 to 255 chars if provided',
  })
  @IsOptional()
  @Length(30, 255)
  bio?: string;

  @Field({
    nullable: true,
    description: 'Avatar url of the user. It is optional but should be valid URL if provided',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  avatar?: string;
}
