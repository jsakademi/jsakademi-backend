import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update User Input' })
export class TagUpdateInput {
  @Field({
    nullable: true,
    description: 'Title of the tag',
  })
  @IsOptional()
  @MaxLength(30)
  title?: string;

  @Field({
    nullable: true,
    description: 'Description for the tag',
  })
  @IsOptional()
  @Length(30, 255)
  description?: string;
}
