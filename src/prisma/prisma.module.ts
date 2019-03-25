import { Module } from '@nestjs/common';
import { prisma } from '../../database/generated/prisma-client/index';

const prismaProvider = {
  provide: 'PrismaService',
  useFactory: () => () => prisma,
};

@Module({
  providers: [prismaProvider],
  exports: ['PrismaService'],
})
export class PrismaModule {}
