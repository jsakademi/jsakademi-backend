import { UserUpdateInput } from './dto/user-update.input';
import { UserCreateInput } from './dto/user-create.input';
import { User } from './models/user';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const mockUser: User = {
  id: 'testId',
  firstName: 'Poyraz',
  lastName: 'Yilmaz',
  email: 'test@test.com',
  bio: 'biography of the user',
  avatar: 'http://avatar.url.com',
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService, useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findFollowingTags: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call usersService `findAll` methods with no params when `users` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'findAll');
    await resolver.users();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith();
    mockFn.mockClear();
  });

  it('should call usersService `findById` methods with id params when `user` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'findById');
    await resolver.user(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockUser.id);
    mockFn.mockClear();
  });

  it('should call usersService `create` methods with userCreateInput params when `createUser` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'create');
    const userCreateInput: UserCreateInput = { ...mockUser };
    await resolver.createUser(userCreateInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(userCreateInput);
    mockFn.mockClear();
  });

  it('should call usersService `update` methods with userCreateInput and Id params when `updateUser` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'update');
    const userUpdateInput: UserUpdateInput = {
      ...mockUser,
      followTags: ['tagId'],
      unfollowTags: ['tagId'],
    };
    await resolver.updateUser(userUpdateInput, mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(userUpdateInput, mockUser.id);
    mockFn.mockClear();
  });

  it('should call usersService `delete` methods with id params when `deleteUser` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'delete');
    await resolver.deleteUser(mockUser.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockUser.id);
    mockFn.mockClear();
  });

  it('should call usersService `findFollowingTags` methods with id params when `followingTags` method is called', async () => {
    const mockFn = jest.spyOn(usersService, 'findFollowingTags');
    await resolver.followingTags(mockUser);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockUser.id);
    mockFn.mockClear();
  });
});
