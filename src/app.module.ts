import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
    }),
    UsersModule,
    TagsModule,
    NewsModule,
  ],
})
export class AppModule {}
