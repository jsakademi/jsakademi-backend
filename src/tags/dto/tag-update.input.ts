import { IsOptional, Length, MaxLength, IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update Tag Input' })
export class TagUpdateInput {
  @Field({
    nullable: true,
    description: 'Title of the tag. It should not be empty or more than 30 chars',
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(30)
  title?: string;

  @Field({
    nullable: true,
    description: 'Description for the tag. It should be between 30 to 255 chars',
  })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field({
    nullable: true,
    description: 'Logo of the tag. It is optional but should be valid URL if provided',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  logo?: string;
}
