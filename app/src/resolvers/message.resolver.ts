// src/resolvers/message.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Message } from '../models/message.model';
import { ConversationService } from '../services/conversation.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private conversationService: ConversationService) { }

  @Query(() => [Message])
  getMessages(@Args('conversationId') conversationId: string): Message[] {
    const conversation = this.conversationService.getConversationById(conversationId);
    return conversation ? conversation.messages : [];
  }
}
