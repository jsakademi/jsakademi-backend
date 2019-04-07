import { Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New Tag Input' })
export class TagCreateInput {
  @Field({ description: 'Title of tag and it is required' })
  @MaxLength(30)
  title: string;

  @Field({ description: 'Description for the tag, it is required and can be between 30 to 255 chars' })
  @Length(30, 255)
  description: string;
}
