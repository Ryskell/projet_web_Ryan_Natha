import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageProcessor } from './message.processor';
import { ConversationService } from '../services/conversation.service';
import { memoryStoreProvider } from '../services/memory-store.provider';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageProcessor, ConversationService, memoryStoreProvider],
  exports: [BullModule, memoryStoreProvider],
})
export class QueueModule { }
