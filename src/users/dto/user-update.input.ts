import { IsOptional, Length, MaxLength, IsNotEmpty, IsEmail, IsUrl, IsArray } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update User Input' })
export class UserUpdateInput {
  @Field({
    nullable: true,
    description: 'First name of the user. It should not be empty',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  firstName?: string;

  @Field({
    nullable: true,
    description: 'Last Name of the user. It should not be empty',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  lastName?: string;

  @Field({
    nullable: true,
    description: 'Email can be updated but it should be unique and valid email, server will not update user if given email is already taken',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @Field({
    nullable: true,
    description: 'Biography of the user. It should be between 30 to 255 chars if provided',
  })
  @IsOptional()
  @Length(30, 255)
  bio?: string;

  @Field({
    nullable: true,
    description: 'Avatar url of the user. It should be valid URL if provided',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  avatar?: string;

  @Field(
    returns => [String],
    {
      nullable: true,
      description: 'Id list of tags that user wants to follow. It should be an array of string if provided',
    },
  )
  @IsOptional()
  @IsArray()
  followTags?: [string];

  @Field(
    returns => [String],
    {
      nullable: true,
      description: 'Id list of tags that user wants to unfollow. It should be an array of string if provided',
    },
  )
  @IsOptional()
  @IsArray()
  unfollowTags?: [string];
}
