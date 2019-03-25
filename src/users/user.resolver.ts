import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { User } from './models/user';
import { Query } from 'type-graphql';

@Resolver(of => User)
export class UserResolver {

  constructor(@Inject('PrismaService') private readonly prisma) {}

  @Query(returns => [User])
  async users() {
    return await this.prisma.users();
  }
}
