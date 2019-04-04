import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType({ description: 'The User Model' })
export class User {
  @Field(type => ID)
  id: string;

  @Field({ description: 'First name of the user' })
  firstName: string;

  @Field({ description: 'Last name of the user' })
  lastName: string;

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
