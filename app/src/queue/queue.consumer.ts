import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService } from '../modules/message/message.service';

@Processor('message-queue')
export class QueueConsumer {
  constructor(private readonly messageService: MessageService) { }

  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { content, senderId, conversationId } = job.data;
    await this.messageService.createMessage(content, senderId, conversationId); // Sauvegardez le message
  }
}
