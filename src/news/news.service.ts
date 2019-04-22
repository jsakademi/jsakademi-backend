import { User } from './../users/models/user';
import { Tag } from './../tags/models/tag';
import { NewsUpdateInput } from './dto/news-update.input';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { News } from './models/news';
import { NewsCreateInput } from './dto/news-create.input';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<News[]> {
    return await this.prisma.api.newses();
  }

  async findById(id: string): Promise<News> {
    return await this.prisma.api.news({ id });
  }

  async create(newsCreateInput: NewsCreateInput): Promise<News> {
    const { tags, authorId, ...news } = newsCreateInput;
    const relatedTags = this.prisma.generateConnectAndDisconnect('relatedTags', tags);
    const author = this.prisma.generateConnectAndDisconnectForOne('author', authorId);
    const data = {
      ...news,
      ...relatedTags,
      ...author,
    };
    return await this.prisma.api.createNews(data);
  }

  async update(newsUpdateInput: NewsUpdateInput, id: string): Promise<News> {
    const { addTags, removeTags, ...news } = newsUpdateInput;
    const relatedTags = this.prisma.generateConnectAndDisconnect('relatedTags', addTags, removeTags);
    const data = {
      ...news,
      ...relatedTags,
    };
    return await this.prisma.api.updateNews({ data, where: { id } });
  }

  async delete(id: string): Promise<News> {
    return await this.prisma.api.deleteNews({ id });
  }

  async findRelatedTags(id: string): Promise<Tag[]> {
    return await this.prisma.api.news({ id }).relatedTags();
  }

  async findAuthor(id: string): Promise<User> {
    return await this.prisma.api.news({ id }).author();
  }

  async findLikes(id: string): Promise<User[]> {
    return await this.prisma.api.news({ id }).likes();
  }
}
