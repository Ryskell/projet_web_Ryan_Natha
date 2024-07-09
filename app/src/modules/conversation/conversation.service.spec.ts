import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './conversation.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../../models/user.model';
import { Conversation } from '../../models/conversation.model';

describe('ConversationService', () => {
  let service: ConversationService;
  let conversationRepository: jest.Mocked<ConversationRepository>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationService,
        {
          provide: ConversationRepository,
          useValue: {
            createConversation: jest.fn(),
            findConversationById: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
    conversationRepository = module.get(ConversationRepository);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a conversation', async () => {
    const participants: User[] = [{ id: '1', username: 'John', email: 'john@example.com', createdAt: new Date() }];
    const conversation: Conversation = { id: '1', participants, createdAt: new Date() };

    conversationRepository.createConversation.mockResolvedValue(conversation);

    const result = await service.createConversation(participants);
    expect(result).toEqual(conversation);
    expect(conversationRepository.createConversation).toHaveBeenCalledWith(participants);
  });

  it('should find conversation by id', async () => {
    const conversation: Conversation = { id: '1', participants: [], createdAt: new Date() };

    conversationRepository.findConversationById.mockResolvedValue(conversation);

    const result = await service.findConversationById('1');
    expect(result).toEqual(conversation);
    expect(conversationRepository.findConversationById).toHaveBeenCalledWith('1');
  });

  it('should return empty array if user not found', async () => {
    userRepository.findUserById.mockResolvedValue(null);

    const result = await service.findUserConversations('1');
    expect(result).toEqual([]);
    expect(userRepository.findUserById).toHaveBeenCalledWith('1');
  });
});
