import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { Message } from 'src/models/message.model';

describe('QueueService', () => {
  let service: QueueService;
  let messageQueue: jest.Mocked<Queue>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: getQueueToken('message-queue'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
    messageQueue = module.get(getQueueToken('message-queue'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add message to queue', async () => {
    const message: Message = {
      id: '1',
      content: 'Hello',
      sender: null,
      conversation: null,
      createdAt: new Date(),
    };

    await service.addMessageToQueue(message);
    expect(messageQueue.add).toHaveBeenCalledWith('sendMessage', message);
  });
});
