import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The User Model' })
export class User {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Firstname of the user' })
  firstname: string;

  @Field({ description: 'Lastname of the user' })
  lastname: string;

  @Field({ description: 'Email of the user' })
  email: string;

  @Field({
    nullable: true,
    description: 'Biography of the user',
  })
  bio?: string;

  @Field({
    nullable: true,
    description: 'Avatar url of the user',
  })
  avatar?: string;
}
