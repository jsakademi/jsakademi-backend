import { News } from './../news/models/news';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './models/user';
import { Tag } from './../tags/models/tag';
import { UserUpdateInput } from './dto/user-update.input';
import { UserCreateInput } from './dto/user-create.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return await this.prisma.api.users();
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.api.user({ id });
  }

  async create(userCreateInput: UserCreateInput): Promise<User> {
    return await this.prisma.api.createUser(userCreateInput);
  }

  async update(userUpdateInput: UserUpdateInput, id: string): Promise<User> {
    const { followTags, unfollowTags, addNewsToFavorite, removeNewsFromFavorite, ...user } = userUpdateInput;
    const followingTags = this.prisma.generateConnectAndDisconnect('followingTags', followTags, unfollowTags);
    const favoriteNews = this.prisma.generateConnectAndDisconnect('favoriteNews', addNewsToFavorite, removeNewsFromFavorite);
    const data = {
      ...user,
      ...followingTags,
      ...favoriteNews,
    };
    return await this.prisma.api.updateUser({ data, where: { id } });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.api.deleteUser({ id });
  }

  async findFollowingTags(id: string): Promise<Tag[]> {
    return await this.prisma.api.user({ id }).followingTags();
  }

  async findFavoriteNews(id: string): Promise<News[]> {
    return await this.prisma.api.user({ id }).favoriteNews();
  }
}
