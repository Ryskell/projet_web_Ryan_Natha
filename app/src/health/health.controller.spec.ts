import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { QueueService } from '../queue/queue.service';
import { QueueModule } from '../queue/queue.module';
import { getQueueToken } from '@nestjs/bull';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [QueueModule],
      controllers: [HealthController],
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

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return OK', () => {
    expect(controller.checkHealth()).toBe('OK');
  });
});
