import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '../../database/generated/prisma-client';

@Injectable()
export class PrismaService {
  api: Prisma;
  constructor() {
    this.api = prisma;
  }

  generateConnectAndDisconnect(fieldName: string, connectIds?: string[], disconnectIds?: string[]): any {
    if (!fieldName || (!connectIds && !disconnectIds)) {
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

  generateConnectAndDisconnectForOne(fieldName: string, connectId?: string, disconnectId?: string): any {
    if (!fieldName || (!connectId && !disconnectId)) {
      return {};
    } else {
      const connect = connectId ? { connect: { id: connectId } } : {};
      const disconnect = disconnectId ? { disconnect: { id: disconnectId } } : {};
      return {
        [fieldName]: {
          ...connect,
          ...disconnect,
        },
      };
    }
  }
}
