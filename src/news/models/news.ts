import { Tag } from './../../tags/models/tag';
import { User } from './../../users/models/user';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The News Model' })
export class News {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Title of the news' })
  title: string;

  @Field({ description: 'Cover image url of the news' })
  cover: string;

  @Field({ description: 'Description of the news' })
  description: string;

  @Field({ description: 'Content of the news' })
  content: string;

  @Field({ description: 'Creation date of news' })
  createdAt: string;

  author?: User;

  likes?: User[];

  relatedTags?: Tag[];
}
