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
    return await this.prisma.api.updateUser({ data: userUpdateInput, where: { id } });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.api.deleteUser({ id });
  }

  async findFollowingTags(id: string): Promise<Tag[]> {
    return await this.prisma.api.user({ id }).followingTags();
  }
}
