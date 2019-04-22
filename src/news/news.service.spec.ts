import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { News } from './models/news';
import { PrismaService } from './../prisma/prisma.service';
import { NewsCreateInput } from './dto/news-create.input';
import { NewsUpdateInput } from './dto/news-update.input';

const mockRelatedTags = jest.fn();
const mockAuthor = jest.fn();
const mockLikes = jest.fn();
const mockNews: News = {
  id: 'testId',
  title: 'JsAkademi News',
  cover: 'http://google.com/',
  description: 'description of the news',
  content: 'content of the news'
};
const mockApi = {
  newses: jest.fn(),
  news: jest.fn().mockImplementation(id => ({
    id,
    relatedTags: mockRelatedTags,
    author: mockAuthor,
    likes: mockLikes
  })),
  deleteNews: jest.fn().mockImplementation(id => ({ id })),
  createNews: jest.fn().mockImplementation(() => mockNews),
  updateNews: jest.fn().mockImplementation(() => mockNews),

  author: jest.fn().mockImplementation(id => ({ id })),
  likes: jest.fn().mockImplementation(id => ({ id }))
};
describe('NewsService', () => {
  let service: NewsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: PrismaService, useValue: {
            api: mockApi,
            generateConnectAndDisconnect: jest.fn(),
            generateConnectAndDisconnectForOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all newses by using prismaService newses method', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'newses');
    await service.findAll();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalled();
    mockFn.mockClear();

  });

  it('should find news with id by using prismaService tag method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'news');
    const result = await service.findById(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockNews.id });
    expect(result.id).toEqual({ id: mockNews.id });
    mockFn.mockClear();
  });

  it('should create news by using prismaService createNews method with newsCreateInput as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'createNews');
    const mockGenerateConnectAndDisconnect = jest.spyOn(prismaService, 'generateConnectAndDisconnect');
    const mockGenerateConnectAndDisconnectForOne = jest.spyOn(prismaService, 'generateConnectAndDisconnectForOne');
    const newsCreateInput: NewsCreateInput = { authorId: 'authorId', tags: ['tagId'], ...mockNews };
    const result = await service.create(newsCreateInput);

    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledTimes(1);
    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledWith('relatedTags', newsCreateInput.tags);
    expect(mockGenerateConnectAndDisconnectForOne).toHaveBeenCalledTimes(1);
    expect(mockGenerateConnectAndDisconnectForOne).toHaveBeenCalledWith('author', newsCreateInput.authorId);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(mockNews);
    expect(result).toEqual(mockNews);

    mockGenerateConnectAndDisconnect.mockClear();
    mockGenerateConnectAndDisconnectForOne.mockClear();
    mockFn.mockClear();
  });

  it('should update news by using prismaService updateNews method with newsUpdateInput as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'updateNews');
    const mockGenerateConnectAndDisconnect = jest.spyOn(prismaService, 'generateConnectAndDisconnect');
    const newsUpdateInput: NewsUpdateInput = { ...mockNews, addTags: ["tagId"], removeTags: ["tagId"] };
    const result = await service.update(newsUpdateInput, mockNews.id);

    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledTimes(1);
    expect(mockGenerateConnectAndDisconnect).toHaveBeenCalledWith('relatedTags', newsUpdateInput.addTags, newsUpdateInput.removeTags);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ data: { ...mockNews }, where: { id: mockNews.id } });
    expect(result).toEqual(mockNews);

    mockGenerateConnectAndDisconnect.mockClear();
    mockFn.mockClear();
  });

  it('should delete news with id by using prismaService deleteNews method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'deleteNews');
    const result = await service.delete(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockNews.id });
    expect(result.id).toEqual({ id: mockNews.id });
    mockFn.mockClear();
  });

  it('should find relatedTags with id by using prismaService news method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'news');
    const result = await service.findRelatedTags(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockNews.id });
    expect(result).toEqual(mockNews.relatedTags);
    mockFn.mockClear();
  });

  it('should find author with id by using prismaService news method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'news');
    const result = await service.findAuthor(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockNews.id });
    expect(result).toEqual(mockNews.author);
    mockFn.mockClear();
  });

  it('should find likes with id by using prismaService news method with id as a parameter', async () => {
    const mockFn = jest.spyOn(prismaService.api, 'news');
    const result = await service.findAuthor(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith({ id: mockNews.id });
    expect(result).toEqual(mockNews.likes);
    mockFn.mockClear();
  });

});
