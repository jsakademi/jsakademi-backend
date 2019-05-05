import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      playground: true,
      introspection: true,
    }),
    UsersModule,
    TagsModule,
    NewsModule,
  ],
})
export class AppModule { }
