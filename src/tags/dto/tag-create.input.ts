import { Length, MaxLength, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New Tag Input' })
export class TagCreateInput {
  @Field({ description: 'Title of tag. It is required and should not be empty or more than 30 chars' })
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @Field({ description: 'Description for the tag. It is required and should be between 30 to 255 chars' })
  @Length(30, 255)
  description: string;
}
