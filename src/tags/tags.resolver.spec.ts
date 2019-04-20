import { TagUpdateInput } from './dto/tag-update.input';
import { TagCreateInput } from './dto/tag-create.input';
import { Tag } from './models/tag';
import { Test, TestingModule } from '@nestjs/testing';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

const mockTag: Tag = {
  id: 'testId',
  title: 'JsAkademi',
  description: 'description of the tag',
};

describe('TagsResolver', () => {
  let resolver: TagsResolver;
  let tagsService: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsResolver,
        {
          provide: TagsService, useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findFollowers: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<TagsResolver>(TagsResolver);
    tagsService = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call tagsService `findAll` methods with no params when `tags` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'findAll');
    await resolver.tags();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith();
    mockFn.mockClear();
  });

  it('should call tagsService `findById` methods with id params when `tag` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'findById');
    await resolver.tag(mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockTag.id);
    mockFn.mockClear();
  });

  it('should call tagsService `create` methods with tagCreateInput params when `createTag` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'create');
    const tagCreateInput: TagCreateInput = { ...mockTag };
    await resolver.createTag(tagCreateInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(tagCreateInput);
    mockFn.mockClear();
  });

  it('should call tagsService `update` methods with tagCreateInput and Id params when `updateTag` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'update');
    const tagUpdateInput: TagUpdateInput = { ...mockTag };
    await resolver.updateTag(tagUpdateInput, mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(tagUpdateInput, mockTag.id);
    mockFn.mockClear();
  });

  it('should call tagsService `delete` methods with id params when `deleteTag` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'delete');
    await resolver.deleteTag(mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockTag.id);
    mockFn.mockClear();
  });

  it('should call tagsService `findFollowers` methods with id params when `followers` method is called', async () => {
    const mockFn = jest.spyOn(tagsService, 'findFollowers');
    await resolver.followers(mockTag);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockTag.id);
    mockFn.mockClear();
  });
});
