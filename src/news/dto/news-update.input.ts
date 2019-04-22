import { IsOptional, Length, MaxLength, IsArray, IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Update News Input' })
export class NewsUpdateInput {
  @Field({
    description: 'Title of the news. It should not be empty, maximum 50 chars',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(50)
  title?: string;

  @Field({
    description: 'Cover image url of the news. It should not be empty and be valid URL',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  cover?: string;

  @Field({
    description: 'Description for the news. It should be between 30 to 255 chars',
    nullable: true,
  })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field({
    description: 'Content for the news. It should not be empty',
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @Field(
    type => [String],
    {
      nullable: true,
      description: 'Id list of tags that the news will be related.',
    },
  )
  @IsOptional()
  @IsArray()
  addTags?: [string];

  @Field(
    type => [String],
    {
      nullable: true,
      description: 'Id list of tags that the news will be removed from relatedTags list.',
    },
  )
  @IsOptional()
  @IsArray()
  removeTags?: [string];
}
