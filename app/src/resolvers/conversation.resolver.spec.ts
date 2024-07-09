import { Test, TestingModule } from '@nestjs/testing';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from '../modules/conversation/conversation.service';
import { UserService } from '../modules/user/user.service';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';

describe('ConversationResolver', () => {
  let resolver: ConversationResolver;
  let conversationService: jest.Mocked<ConversationService>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationResolver,
        {
          provide: ConversationService,
          useValue: {
            createConversation: jest.fn(),
            findUserConversations: jest.fn(),
            findConversationById: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ConversationResolver>(ConversationResolver);
    conversationService = module.get(ConversationService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a conversation', async () => {
    const participantIds = ['1', '2'];
    const participants: User[] = [
      { id: '1', username: 'User1', email: 'user1@example.com', createdAt: new Date() },
      { id: '2', username: 'User2', email: 'user2@example.com', createdAt: new Date() },
    ];
    const conversation: Conversation = { id: '1', participants, createdAt: new Date() };

    userService.findUserById.mockImplementation((id: string) => {
      return Promise.resolve(participants.find(user => user.id === id));
    });
    conversationService.createConversation.mockResolvedValue(conversation);

    const result = await resolver.createConversation(participantIds);
    expect(result).toEqual(conversation);
    expect(userService.findUserById).toHaveBeenCalledTimes(2);
    expect(conversationService.createConversation).toHaveBeenCalledWith(participants);
  });

  it('should get user conversations', async () => {
    const userId = '1';
    const conversations: Conversation[] = [{ id: '1', participants: [], createdAt: new Date() }];

    conversationService.findUserConversations.mockResolvedValue(conversations);

    const result = await resolver.getUserConversations(userId);
    expect(result).toEqual(conversations);
    expect(conversationService.findUserConversations).toHaveBeenCalledWith(userId);
  });

  it('should get conversation by id', async () => {
    const conversation: Conversation = { id: '1', participants: [], createdAt: new Date() };

    conversationService.findConversationById.mockResolvedValue(conversation);

    const result = await resolver.getConversation('1');
    expect(result).toEqual(conversation);
    expect(conversationService.findConversationById).toHaveBeenCalledWith('1');
  });
});
