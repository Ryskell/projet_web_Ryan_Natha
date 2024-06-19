// src/resolvers/conversation.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../services/user.service';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { MessageService } from 'src/services/message.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  @Query(() => [Conversation])
  getConversations(@Args('userId') userId: string): Conversation[] {
    return this.conversationService.getConversationsByUserId(userId);
  }

  @Mutation(() => Conversation)
  createConversation(
    @Args('participantIds', { type: () => [String] }) participantIds: string[],
  ): Conversation {
    const participants = participantIds.map(id => this.userService.getUserById(id));
    if (participants.some(participant => !participant)) {
      throw new Error('One or more participants not found');
    }
    return this.conversationService.createConversation(participants);
  }

  @Mutation(() => Conversation)
  sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
    @Args('senderId') senderId: string,
  ): Conversation {
    const sender = this.userService.getUserById(senderId);
    if (!sender) {
      throw new Error('Sender not found');
    }
    const message = this.messageService.createMessage(content, sender);
    return this.conversationService.addMessage(conversationId, message);
  }
}
