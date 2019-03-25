import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './models/user';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.prisma.api.users();
  }

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.prisma.api.user({id});
  }
}
