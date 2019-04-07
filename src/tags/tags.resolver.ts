import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './models/tag';
import { User } from './../users/models/user';
import { TagCreateInput } from './dto/tag-create.input';
import { TagUpdateInput } from './dto/tag-update.input';

@Resolver(Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) { }

  @Query(returns => [Tag], { description: 'Find all tags' })
  async tags(): Promise<Tag[]> {
    return await this.tagsService.findAll();
  }

  @Query(returns => Tag, { description: 'Find tag with given id' })
  async tag(@Args('id') id: string): Promise<Tag> {
    return await this.tagsService.findById(id);
  }

  @Mutation(returns => Tag, { description: 'Create new tag with given data' })
  async createTag(@Args('tagCreateInput') tagCreateInput: TagCreateInput): Promise<Tag> {
    return await this.tagsService.create(tagCreateInput);
  }

  @Mutation(returns => Tag, { description: 'Update tag with given id' })
  async updateTag(
    @Args('tagUpdateInput') tagUpdateInput: TagUpdateInput,
    @Args('id') id: string,
  ): Promise<Tag> {
    return await this.tagsService.update(tagUpdateInput, id);
  }

  @Mutation(returns => Tag, { description: 'Delete tag with given id' })
  async deleteTag(@Args('id') id: string): Promise<Tag> {
    return await this.tagsService.delete(id);
  }

  @ResolveProperty(
    'followers',
    returns => [User],
    {
      description: 'Users who are following tag with given id',
      nullable: true,
    },
  )
  async followers(@Parent() tag: Tag): Promise<User[]> {
    return await this.tagsService.findFollowers(tag.id);
  }
}
