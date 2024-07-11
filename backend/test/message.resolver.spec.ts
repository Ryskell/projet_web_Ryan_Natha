import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from '../src/message/message.resolver';
import { MessageService } from '../src/message/message.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { MessageInput } from '../src/message/message.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message as SchemaMessage } from '../src/message/message.schema';
import { ConversationService } from '../src/conversation/conversation.service';
import { UserService } from '../src/user/user.service';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let messageService: MessageService;
  let conversationService: ConversationService;
  let userService: UserService;
  let messageModel: Model<SchemaMessage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            sendMessage: jest.fn(),
            remove: jest.fn(),
            findByConversationId: jest.fn(),
            findByUserId: jest.fn(),
          },
        },
        {
          provide: ConversationService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getModelToken('Message'),
          useValue: {
            new: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    messageService = module.get<MessageService>(MessageService);
    messageModel = module.get<Model<SchemaMessage>>(getModelToken('Message'));
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('message', () => {
    it('should throw NotFoundException if message not found', async () => {
      const validId = new Types.ObjectId().toString();
      jest.spyOn(messageService, 'findOneById').mockResolvedValueOnce(null);

      await expect(resolver.message(validId)).rejects.toThrow(NotFoundException);
      await expect(resolver.message(validId)).rejects.toThrow(validId);
    });

    it('should return a message if found', async () => {
      const validId = new Types.ObjectId().toString();

      const mockMessage = {
        id: validId,
        conversationId: new Types.ObjectId().toString(),
        from: new Types.ObjectId().toString(),
        content: 'Test message',
        timeStamp: Date.now(),
      };

      jest.spyOn(messageService, 'findOneById').mockResolvedValueOnce(mockMessage);

      const result = await resolver.message(validId);
      expect(result).toEqual(mockMessage);
    });
  });

  describe('removeMessage', () => {
    it('should throw BadRequestException for an invalid ID', async () => {
      const invalidId = '123';

      await expect(resolver.removeMessage(invalidId)).rejects.toThrow(BadRequestException);
      await expect(resolver.removeMessage(invalidId)).rejects.toThrow(`Invalid ID format: ${invalidId}`);
    });
    it('should remove a message if found', async () => {
      const validId = new Types.ObjectId().toString();

      const mockMessage = {
        id: validId,
        conversationId: new Types.ObjectId().toString(),
        from: new Types.ObjectId().toString(),
        content: 'Test message',
        timeStamp: Date.now(),
      };
      jest.spyOn(messageService, 'findOneById').mockResolvedValueOnce(Promise.resolve(mockMessage));
      jest.spyOn(messageService, 'remove').mockResolvedValueOnce(true);

      const result = await resolver.removeMessage(validId);
      expect(result).toEqual(true);
    });

    it('should throw NotFoundException if message not found', async () => {
      const validId = new Types.ObjectId().toString();

      jest.spyOn(messageService, 'remove').mockResolvedValueOnce(false);


      await expect(resolver.removeMessage(validId)).rejects.toThrow(NotFoundException);
      await expect(resolver.removeMessage(validId)).rejects.toThrow("Not Found");
    });
  });

  describe('messages', () => {
    it('should return an array of messages', async () => {
      const mockMessages: any[] = [
        {
          _id: new Types.ObjectId().toString(),
          conversationId: new Types.ObjectId().toString(),
          from: new Types.ObjectId().toString(),
          content: 'Message 1',
          timestamp: Date.now(),
        },
        {
          _id: new Types.ObjectId().toString(),
          conversationId: new Types.ObjectId().toString(),
          from: new Types.ObjectId().toString(),
          content: 'Message 2',
          timestamp: Date.now(),
        },
      ];

      jest.spyOn(messageService, 'findAll').mockResolvedValueOnce(mockMessages);

      const result = await resolver.getMessages();
      expect(result).toEqual(mockMessages);
    });

    it('should return an empty array if no messages found', async () => {
      const mockEmptyMessages = [] as SchemaMessage[];

      jest.spyOn(messageService, 'findAll').mockResolvedValueOnce(mockEmptyMessages);

      const result = await resolver.getMessages();
      expect(result).toEqual([]);
    });
  });

  describe('messagesByConversationId', () => {
    it('should return messages for a specific conversation', async () => {
      const conversationId = new Types.ObjectId().toString();
      const mockMessages: any[] = [
        {
          _id: new Types.ObjectId().toString(),
          conversationId: conversationId,
          from: new Types.ObjectId().toString(),
          content: 'Message 1',
          timestamp: Date.now(),
        },
      ];

      jest.spyOn(messageService, 'findByConversationId').mockResolvedValueOnce(mockMessages);

      const result = await resolver.messagesByConversationId(conversationId);
      expect(result).toEqual(mockMessages);
    });
  });

  describe('messagesByUserId', () => {
    it('should return messages for a specific user', async () => {
      const userId = new Types.ObjectId().toString();
      const mockMessages: any[] = [
        {
          _id: new Types.ObjectId().toString(),
          conversationId: new Types.ObjectId().toString(),
          from: userId,
          content: 'Message 1',
          timestamp: Date.now(),
        },
      ];

      jest.spyOn(messageService, 'findByUserId').mockResolvedValueOnce(mockMessages);

      const result = await resolver.messagesByUserId(userId);
      expect(result).toEqual(mockMessages);
    });
  });
});
