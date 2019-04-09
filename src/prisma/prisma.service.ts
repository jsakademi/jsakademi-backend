import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '../../database/generated/prisma-client';

@Injectable()
export class PrismaService {
  api: Prisma;
  constructor() {
    this.api = prisma;
  }

  generateConnectAndDisconnect(fieldName: string, connectIds: string[], disconnectIds: string[]) {
    if (!connectIds && !disconnectIds) {
      return {};
    } else {
      const connect = connectIds ? { connect: connectIds.map(id => ({ id })) } : {};
      const disconnect = disconnectIds ? { disconnect: disconnectIds.map(id => ({ id })) } : {};
      return {
        [fieldName]: {
          ...connect,
          ...disconnect,
        },
      };
    }
  }
}
