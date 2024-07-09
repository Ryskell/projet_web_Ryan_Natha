import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver } from './message.resolver';
import { MessageService } from '../modules/message/message.service';
import { UserService } from '../modules/user/user.service';
import { ConversationService } from '../modules/conversation/conversation.service';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { Conversation } from '../models/conversation.model';

describe('MessageResolver', () => {
  let resolver: MessageResolver;
  let messageService: jest.Mocked<MessageService>;
  let userService: jest.Mocked<UserService>;
  let conversationService: jest.Mocked<ConversationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageResolver,
        {
          provide: MessageService,
          useValue: {
            createMessage: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
        {
          provide: ConversationService,
          useValue: {
            findConversationById: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageResolver>(MessageResolver);
    messageService = module.get(MessageService);
    userService = module.get(UserService);
    conversationService = module.get(ConversationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should send a message', async () => {
    const content = 'Hello';
    const senderId = '1';
    const conversationId = '1';
    const sender: User = { id: '1', username: 'John', email: 'john@example.com', createdAt: new Date() };
    const conversation: Conversation = { id: '1', participants: [sender], createdAt: new Date() };
    const message: Message = { id: '1', content, sender, conversation, createdAt: new Date() };

    userService.findUserById.mockResolvedValue(sender);
    conversationService.findConversationById.mockResolvedValue(conversation);
    messageService.createMessage.mockResolvedValue(message);

    const result = await resolver.sendMessage(content, senderId, conversationId);
    expect(result).toEqual(message);
    expect(userService.findUserById).toHaveBeenCalledWith(senderId);
    expect(conversationService.findConversationById).toHaveBeenCalledWith(conversationId);
    expect(messageService.createMessage).toHaveBeenCalledWith(content, sender, conversation);
  });
});
