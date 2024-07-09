// src/queue/queue.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Message } from '../models/message.model';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('message-queue') private readonly messageQueue: Queue,
  ) { }

  async addMessageToQueue(message: Message): Promise<void> {
    await this.messageQueue.add('sendMessage', message);
  }
}
