import { IsOptional, Length, MaxLength, IsArray, IsNotEmpty, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New News Input' })
export class NewsCreateInput {
  @Field({ description: 'Title of the news. It is required and should not be empty, maximum 50 chars' })
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @Field({ description: 'Cover image url of the news. It is required and should be valid URL' })
  @IsNotEmpty()
  @IsUrl()
  cover: string;

  @Field({ description: 'Description for the news. It is required and should be between 30 to 255 chars' })
  @Length(30, 255)
  description: string;

  @Field({ description: 'Content for the news. It is required and should not be empty' })
  @IsNotEmpty()
  content: string;

  @Field({ description: 'Author id of the news. It is required and should not be empty' })
  @IsNotEmpty()
  authorId: string;

  @Field(
    type => [String],
    {
      nullable: true,
      description: 'Id list of tags that the news will be related. It is optional but it is advised to add tags when creating news',
    },
  )
  @IsOptional()
  @IsArray()
  tags?: [string];
}
