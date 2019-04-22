import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';

@Module({
  imports: [PrismaModule],
  providers: [NewsResolver, NewsService],
})
export class NewsModule { }
