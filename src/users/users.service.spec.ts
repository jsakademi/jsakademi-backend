import { UserUpdateInput } from './dto/user-update.input';
import { UserCreateInput } from './dto/user-create.input';
import { User } from './models/user';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from './../prisma/prisma.service';

const mockFollowingTagsFn = jest.fn();
const mockFavoriteNewsFn = jest.fn();
const mockUser: User = {
  id: 'testId',
  firstName: 'Poyraz',
  lastName: 'Yilmaz',
  email: 'test@test.com',
  bio: 'biography of the user',
  avatar: 'http://avatar.url.com',
};
const mockApi = {
  users: jest.fn(),
  user: jest.fn().mockImplementation(id => ({
    id,
    followingTags: mockFollowingTagsFn,
    favoriteNews: mockFavoriteNewsFn,
  })),
  deleteUser: jest.fn().mockImplementation(id => ({ id })),
  createUser: jest.fn().mockImplementation(() => mockUser),
  updateUser: jest.fn().mockImplementation(() => mockUser),
};

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService, useValue: {
            api: mockApi,
            generateConnectAndDisconnect: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all users by using prismaService users method', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'users');
    await service.findAll();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalled();
    mockFn.mockClear();
  });

  it('should find user with id by using prismaService user method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'user');
    const result = await service.findById(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockUser.id });
    expect(result.id).toEqual({ id: mockUser.id });
    mockFn.mockClear();
  });

  it('should create user by using prismaService createUser method with userCreateInput as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'createUser');
    const userCreateInput: UserCreateInput = { ...mockUser };
    const result = await service.create(userCreateInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(userCreateInput);
    expect(result).toEqual(mockUser);
    mockFn.mockClear();
  });

  it('should update user by using prismaService updateUser method with userUpdateInput and id as parameters', async () => {
    const mockGenerateConnectAndDisconnect = jest.spyOn(prismaService, 'generateConnectAndDisconnect');
    const mockFn = jest.spyOn(prismaService.api, 'updateUser');
    const userUpdateInput: UserUpdateInput = {
      ...mockUser,
      followTags: ['tagId'],
      unfollowTags: ['tagId'],
    };
    const result = await service.update(userUpdateInput, mockUser.id);
    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledTimes(2);
    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledWith('followingTags', userUpdateInput.followTags, userUpdateInput.unfollowTags);
    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledWith('favoriteNews', userUpdateInput.addNewsToFavorite, userUpdateInput.removeNewsFromFavorite);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ data: { ...mockUser }, where: { id: mockUser.id } });
    expect(result).toEqual(mockUser);
    mockGenerateConnectAndDisconnect.mockClear();
    mockFn.mockClear();
  });

  it('should delete user with id by using prismaService deleteUser method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'deleteUser');
    const result = await service.delete(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockUser.id });
    expect(result.id).toEqual({ id: mockUser.id });
    mockFn.mockClear();
  });

  it('should get tags of user with id by using prismaService user.followingTags method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'user');
    await service.findFollowingTags(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockUser.id });
    expect(mockFollowingTagsFn).toHaveBeenCalled();
    mockFn.mockClear();
  });

  it('should get favorite news of user with id by using prismaService user.favoriteNews method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'user');
    await service.findFavoriteNews(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockUser.id });
    expect(mockFavoriteNewsFn).toHaveBeenCalled();
    mockFn.mockClear();
  });
});
