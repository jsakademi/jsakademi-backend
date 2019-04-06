import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Tag } from './models/tag';
import { User } from './../users/models/user';
import { TagCreateInput } from './dto/tag-create.input';
import { TagUpdateInput } from './dto/tag-update.input';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Tag[]> {
    return await this.prisma.api.tags();
  }

  async findById(id: string): Promise<Tag> {
    return await this.prisma.api.tag({ id });
  }

  async create(tagCreateInput: TagCreateInput): Promise<Tag> {
    return await this.prisma.api.createTag(tagCreateInput);
  }

  async update(tagUpdateInput: TagUpdateInput, id: string): Promise<Tag> {
    return await this.prisma.api.updateTag({ data: tagUpdateInput, where: { id } });
  }

  async delete(id: string): Promise<Tag> {
    return await this.prisma.api.deleteTag({ id });
  }

  async findFollowers(id: string): Promise<User[]> {
    return await this.prisma.api.tag({ id }).followers();
  }
}
