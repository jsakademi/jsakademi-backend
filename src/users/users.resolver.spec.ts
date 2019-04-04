import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let service: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver],
    }).compile();

    service = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
