import { User } from './../../users/models/user';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The Tag Model' })
export class Tag {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Title of the tag' })
  title: string;

  @Field({ description: 'Description for the tag' })
  description: string;

  @Field({
    nullable: true,
    description: 'Logo of the the tag',
  })
  logo?: string;

  followers?: User[];
}
