import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageRepository } from './message.repository';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';
import { QueueService } from 'src/queue/queue.service';
import { QueueModule } from 'src/queue/queue.module';
import { MessageProcessor } from './message.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [UserModule, ConversationModule, QueueModule],
  providers: [
    MessageService,
    MessageResolver,
    MessageRepository,
    QueueService,
    MessageProcessor,
  ],
  exports: [MessageService, MessageProcessor],
})
export class MessageModule {}
