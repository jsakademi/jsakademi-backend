import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '../../database/generated/prisma-client';

@Injectable()
export class PrismaService {
  api: Prisma;
  constructor() {
    this.api = prisma;
  }
}
