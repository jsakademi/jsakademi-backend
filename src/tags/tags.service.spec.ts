import { TagCreateInput } from './dto/tag-create.input';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { Tag } from './models/tag';
import { TagUpdateInput } from './dto/tag-update.input';

const mockFollowersFn = jest.fn();
const mockTag: Tag = {
  id: 'testId',
  title: 'JsAkademi',
  description: 'description of the tag',
};
const mockApi = {
  tags: jest.fn(),
  tag: jest.fn().mockImplementation(id => ({ id, followers: mockFollowersFn })),
  deleteTag: jest.fn().mockImplementation(id => ({ id })),
  createTag: jest.fn().mockImplementation(() => mockTag),
  updateTag: jest.fn().mockImplementation(() => mockTag),
};

describe('TagsService', () => {
  let service: TagsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: PrismaService, useValue: {
            api: mockApi,
          },
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all tags by using prismaService tags method', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'tags');
    await service.findAll();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalled();
    mockFn.mockClear();
  });

  it('should find tag with id by using prismaService tag method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'tag');
    const result = await service.findById(mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockTag.id });
    expect(result.id).toEqual({ id: mockTag.id });
    mockFn.mockClear();
  });

  it('should create tag by using prismaService createTag method with tagCreateInput as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'createTag');
    const tagCreateInput: TagCreateInput = { ...mockTag };
    const result = await service.create(tagCreateInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(tagCreateInput);
    expect(result).toEqual(mockTag);
    mockFn.mockClear();
  });

  it('should update tag by using prismaService updateTag method with tagUpdateInput and id as parameters', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'updateTag');
    const tagUpdateInput: TagUpdateInput = { ...mockTag };
    const result = await service.update(tagUpdateInput, mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ data: { ...mockTag }, where: { id: mockTag.id } });
    expect(result).toEqual(mockTag);
    mockFn.mockClear();
  });

  it('should delete tag with id by using prismaService deleteTag method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'deleteTag');
    const result = await service.delete(mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockTag.id });
    expect(result.id).toEqual({ id: mockTag.id });
    mockFn.mockClear();
  });

  it('should get tag of tag with id by using prismaService tag.findFollowers method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'tag');
    await service.findFollowers(mockTag.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockTag.id });
    expect(mockFollowersFn).toHaveBeenCalled();
    mockFn.mockClear();
  });
});
