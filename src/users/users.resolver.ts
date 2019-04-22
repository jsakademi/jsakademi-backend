import { News } from './../news/models/news';
import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { User } from './models/user';
import { Tag } from './../tags/models/tag';
import { UserCreateInput } from './dto/user-create.input';
import { UserUpdateInput } from './dto/user-update.input';
import { UsersService } from './users.service';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(returns => [User], { description: 'Find all users' })
  async users(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Query(returns => User, { description: 'Find user with given id' })
  async user(@Args('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Mutation(returns => User, { description: 'Create new user with given data' })
  async createUser(@Args('userCreateInput') userCreateInput: UserCreateInput): Promise<User> {
    return await this.usersService.create(userCreateInput);
  }

  @Mutation(returns => User, { description: 'Update user with given id' })
  async updateUser(
    @Args('userUpdateInput') userUpdateInput: UserUpdateInput,
    @Args('id') id: string,
  ): Promise<User> {
    return await this.usersService.update(userUpdateInput, id);
  }

  @Mutation(returns => User, { description: 'Delete user with given id' })
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }

  @ResolveProperty(
    'followingTags',
    type => [Tag],
    {
      description: 'The tags that user is following',
      nullable: true,
    },
  )
  async followingTags(@Parent() user: User): Promise<Tag[]> {
    return await this.usersService.findFollowingTags(user.id);
  }

  @ResolveProperty(
    'favoriteNews',
    type => [News],
    {
      description: 'The favorites news of the user',
      nullable: true,
    },
  )
  async favoriteNews(@Parent() user: User): Promise<News[]> {
    return await this.usersService.findFavoriteNews(user.id);
  }
}
