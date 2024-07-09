import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MessageService } from './message.service';

@Injectable()
@Processor('message-queue')
export class MessageProcessor {
  constructor(private readonly messageService: MessageService) { }

  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { content, senderId, conversationId } = job.data;
    await this.messageService.createMessage(content, senderId, conversationId);
  }
}
