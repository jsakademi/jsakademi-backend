import { Test, TestingModule } from '@nestjs/testing';
import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';
import { News } from './models/news';
import { NewsCreateInput } from './dto/news-create.input';
import { NewsUpdateInput } from './dto/news-update.input';

const mockNews: News = {
  id: 'testId',
  title: 'JsAkademi News',
  cover: 'http://google.com/',
  description: 'description of the news',
  content: 'content of the news'
};

describe('NewsResolver', () => {
  let resolver: NewsResolver;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsResolver,
        {
          provide: NewsService, useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findRelatedTags: jest.fn(),
            findAuthor: jest.fn(),
            findLikes: jest.fn(),
          }
        }
      ],
    }).compile();

    resolver = module.get<NewsResolver>(NewsResolver);
    newsService = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call newsService `findAll` methods with no params when `newses` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'findAll');
    await resolver.findNews();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith();
    mockFn.mockClear();
  });

  it('should call newsService `findById` methods with id when `news` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'findById');
    await resolver.news(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockNews.id);
    mockFn.mockClear();
  });

  it('should call newsService `create` method with newsCreateInput when `createNews` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'create');
    const newsCreateInput: NewsCreateInput = { authorId: "authorId", tags: ['tagId'], ...mockNews };
    await resolver.createNews(newsCreateInput);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(newsCreateInput);
    mockFn.mockClear();
  });

  it('should call newsService `update` method with newsUpdateInput and id when `updateNews` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'update');
    const newsUpdateInput: NewsUpdateInput = { ...mockNews };
    await resolver.updateNews(newsUpdateInput, mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(newsUpdateInput, mockNews.id);
    mockFn.mockClear();
  });

  it('should call newsService `delete` method with id when `deleteNews` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'delete');
    await resolver.deleteNews(mockNews.id);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockNews.id);
    mockFn.mockClear();
  });

  it('should call newsService `findAuthor` method with id when `author` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'findAuthor');
    await resolver.author(mockNews);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockNews.id);
    mockFn.mockClear();
  });


  it('should call newsService `findRelatedTags` method with id when `relatedTags` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'findRelatedTags');
    await resolver.relatedTags(mockNews);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockNews.id);
    mockFn.mockClear();
  });

  it('should call newsService `findLikes` method with id when `likes` method is called', async () => {
    const mockFn = jest.spyOn(newsService, 'findLikes');
    await resolver.likes(mockNews);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(mockNews.id);
    mockFn.mockClear();
  });

});
