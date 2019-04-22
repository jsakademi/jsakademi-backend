import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('generateConnectAndDisconnect', () => {
    const fieldName = 'fieldName';
    const ids = ['testId'];
    const idsResult = ids.map(id => ({ id }));

    it('should return empty object when fieldName is empty string, null or undefined', () => {
      expect(prismaService.generateConnectAndDisconnect('', null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnect(null, null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnect(undefined, null, null)).toEqual({});
    });

    it('should return empty object when both connectIds and disconnectIds are null or undefined', () => {
      expect(prismaService.generateConnectAndDisconnect(fieldName, null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnect(fieldName, null, undefined)).toEqual({});
      expect(prismaService.generateConnectAndDisconnect(fieldName, undefined, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnect(fieldName, undefined, undefined)).toEqual({});
    });

    it('should return new object which has property with given fieldName if at least one of the array provided', () => {
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, null)).toHaveProperty(fieldName);
      expect(prismaService.generateConnectAndDisconnect(fieldName, null, ids)).toHaveProperty(fieldName);
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, ids)).toHaveProperty(fieldName);
    });

    it('should return new object with connect property and it should be array of objects if fieldName and connectIds are provided', () => {
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, null)).toHaveProperty('fieldName.connect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, ids)).toHaveProperty('fieldName.connect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, [], ids)).toHaveProperty('fieldName.connect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, ids)[fieldName].connect).toEqual(idsResult);
      expect(prismaService.generateConnectAndDisconnect(fieldName, [], ids)[fieldName].connect).toEqual([]);
    });

    it('should return new object with disconnect property  and it should be array of objects if fieldName and disconnectIds are provided', () => {
      expect(prismaService.generateConnectAndDisconnect(fieldName, null, ids)).toHaveProperty('fieldName.disconnect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, ids)).toHaveProperty('fieldName.disconnect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, [])).toHaveProperty('fieldName.disconnect');
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, ids)[fieldName].disconnect).toEqual(idsResult);
      expect(prismaService.generateConnectAndDisconnect(fieldName, ids, [])[fieldName].disconnect).toEqual([]);
    });
  });

  describe('generateConnectAndDisconnectForOne', () => {
    const fieldName = 'fieldName';
    const id = 'testId';
    const idResult = { id };

    it('should return empty object when fieldName is empty string, null or undefined', () => {
      expect(prismaService.generateConnectAndDisconnectForOne('', null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnectForOne(null, null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnectForOne(undefined, null, null)).toEqual({});
    });

    it('should return empty object when both connectId and disconnectId are null or undefined', () => {
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, null, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, null, undefined)).toEqual({});
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, undefined, null)).toEqual({});
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, undefined, undefined)).toEqual({});
    });

    it('should return new object which has property with given fieldName if at least one of the array provided', () => {
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, null)).toHaveProperty(fieldName);
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, null, id)).toHaveProperty(fieldName);
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, id)).toHaveProperty(fieldName);
    });

    it('should return new object with connect property and it should be object if fieldName and connectId are provided', () => {
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, null)).toHaveProperty('fieldName.connect');
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, id)).toHaveProperty('fieldName.connect');
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, null)[fieldName].connect).toEqual(idResult);
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, id)[fieldName].connect).toEqual(idResult);
    });

    it('should return new object with disconnect property  and it should be object if fieldName and disconnectId are provided', () => {
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, null, id)).toHaveProperty('fieldName.disconnect');
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, id)).toHaveProperty('fieldName.disconnect');
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, null, id)[fieldName].disconnect).toEqual(idResult);
      expect(prismaService.generateConnectAndDisconnectForOne(fieldName, id, id)[fieldName].disconnect).toEqual(idResult);
    });
  });
});
