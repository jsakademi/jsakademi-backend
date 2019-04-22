import { User } from './../users/models/user';
import { Tag } from './../tags/models/tag';
import { News } from './models/news';
import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { NewsCreateInput } from './dto/news-create.input';
import { NewsUpdateInput } from './dto/news-update.input';

@Resolver(News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) { }

  @Query(returns => [News], { description: 'Find all news' })
  async findNews(): Promise<News[]> {
    return await this.newsService.findAll();
  }

  @Query(returns => News, { description: 'Find news with given id' })
  async news(@Args('id') id: string): Promise<News> {
    return await this.newsService.findById(id);
  }

  @Mutation(returns => News, { description: 'Create new news with given data' })
  async createNews(@Args('newCreateInput') newCreateInput: NewsCreateInput): Promise<News> {
    return await this.newsService.create(newCreateInput);
  }

  @Mutation(returns => News, { description: 'Update news with given id' })
  async updateNews(
    @Args('newsUpdateInput') newsUpdateInput: NewsUpdateInput,
    @Args('id') id: string,
  ): Promise<News> {
    return await this.newsService.update(newsUpdateInput, id);
  }

  @Mutation(returns => News, { description: 'Delete news with given id' })
  async deleteNews(@Args('id') id: string): Promise<News> {
    return await this.newsService.delete(id);
  }

  @ResolveProperty(
    'author',
    type => User,
    {
      description: 'Author of the news',
    },
  )
  async author(@Parent() news: News): Promise<User> {
    return await this.newsService.findAuthor(news.id);
  }

  @ResolveProperty(
    'relatedTags',
    type => [Tag],
    {
      description: 'The tags that news is related to',
      nullable: true,
    },
  )
  async relatedTags(@Parent() news: News): Promise<Tag[]> {
    return await this.newsService.findRelatedTags(news.id);
  }

  @ResolveProperty(
    'likes',
    type => [User],
    {
      description: 'The users who liked the news',
      nullable: true,
    },
  )
  async likes(@Parent() news: News): Promise<User[]> {
    return await this.newsService.findLikes(news.id);
  }
}
