import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MemoryStoreService } from '../services/memory-store.service';

@Processor('message-queue')
export class MessageProcessor {
  constructor(private memoryStoreService: MemoryStoreService) { }

  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { conversationId, message } = job.data;
    try {
      console.log(`Processing job: ${JSON.stringify(job.data)}`);
      const conversation = this.memoryStoreService.getConversationById(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      conversation.messages.push(message);
      console.log(`Message added to conversation ${conversationId}: ${JSON.stringify(message)}`);
    } catch (error) {
      console.error(`Failed to add message to conversation ${conversationId}:`, error);
    }
  }
}
