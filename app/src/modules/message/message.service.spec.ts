import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/user.repository';
import { ConversationRepository } from '../conversation/conversation.repository';
import { User } from '../../models/user.model';
import { Conversation } from '../../models/conversation.model';
import { Message } from '../../models/message.model';

describe('MessageService', () => {
  let service: MessageService;
  let messageRepository: jest.Mocked<MessageRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let conversationRepository: jest.Mocked<ConversationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: MessageRepository,
          useValue: {
            createMessage: jest.fn(),
            findMessageById: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: ConversationRepository,
          useValue: {
            findConversationById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    messageRepository = module.get(MessageRepository);
    userRepository = module.get(UserRepository);
    conversationRepository = module.get(ConversationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const content = 'Hello World';
    const sender: User = {
      id: '1',
      username: 'John',
      email: 'john@example.com',
      createdAt: new Date(),
    };
    const conversation: Conversation = {
      id: '1',
      participants: [sender],
      createdAt: new Date(),
    };
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      conversation,
      createdAt: new Date(),
    };

    messageRepository.createMessage.mockResolvedValue(message);

    const result = await service.createMessage(content, sender, conversation);
    expect(result).toEqual(message);

    // Verify that the method was called with the correct properties
    expect(messageRepository.createMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        content: message.content,
        sender: message.sender,
        conversation: message.conversation,
      }),
    );
  });

  it('should find message by id', async () => {
    const message: Message = {
      id: '1',
      content: 'Hello',
      sender: null,
      conversation: null,
      createdAt: new Date(),
    };

    messageRepository.findMessageById.mockResolvedValue(message);

    const result = await service.findMessageById('1');
    expect(result).toEqual(message);
    expect(messageRepository.findMessageById).toHaveBeenCalledWith('1');
  });

  it('should find user by id', async () => {
    const user: User = {
      id: '1',
      username: 'John',
      email: 'john@example.com',
      createdAt: new Date(),
    };

    userRepository.findUserById.mockResolvedValue(user);

    const result = await service.findUserById('1');
    expect(result).toEqual(user);
    expect(userRepository.findUserById).toHaveBeenCalledWith('1');
  });

  it('should find conversation by id', async () => {
    const conversation: Conversation = {
      id: '1',
      participants: [],
      createdAt: new Date(),
    };

    conversationRepository.findConversationById.mockResolvedValue(conversation);

    const result = await service.findConversationById('1');
    expect(result).toEqual(conversation);
    expect(conversationRepository.findConversationById).toHaveBeenCalledWith(
      '1',
    );
  });
});
