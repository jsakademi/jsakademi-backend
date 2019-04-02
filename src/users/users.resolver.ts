import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from './dto/user-create.input';
import { UserUpdateInput } from './dto/user-update.input';
import { async } from 'rxjs/internal/scheduler/async';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) { }

  @Query(returns => [User], { description: 'Find all users' })
  async users(): Promise<User[]> {
    return await this.prisma.api.users();
  }

  @Query(returns => User, { description: 'Find user with given id' })
  async user(@Args('id') id: string): Promise<User> {
    return await this.prisma.api.user({ id });
  }

  @Mutation(returns => User, { description: 'Create new user with given data' })
  async createUser(@Args('userCreateInput') userCreateInput: UserCreateInput): Promise<User> {
    return await this.prisma.api.createUser(userCreateInput);
  }

  @Mutation(returns => User, { description: 'Update user with given id' })
  async updateUser(
    @Args('userUpdateInput') userUpdateInput: UserUpdateInput,
    @Args('id') id: string,
  ): Promise<User> {
    return await this.prisma.api.updateUser({ data: userUpdateInput, where: { id } });
  }

  @Mutation(returns => User, { description: 'Delete user with given id' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.prisma.api.deleteUser({ id });
  }
}
