import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { ConversationRepository } from './conversation.repository';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [UserModule],
  providers: [
    ConversationService,
    ConversationResolver,
    ConversationRepository,
    UserRepository,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
