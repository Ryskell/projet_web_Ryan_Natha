import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConversationService } from '../services/conversation.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { Conversation } from '../models/conversation.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private conversationService: ConversationService,
    private userService: UserService,
    private messageService: MessageService,
    @InjectQueue('message-queue') private readonly messageQueue: Queue,
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
  async sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('content') content: string,
    @Args('senderId') senderId: string,
  ): Promise<Conversation> {
    const sender = this.userService.getUserById(senderId);
    if (!sender) {
      throw new Error('Sender not found');
    }

    const message = this.messageService.createMessage(content, sender);

    // Add the message to the queue
    await this.messageQueue.add('sendMessage', {
      conversationId,
      message,
    });

    return this.conversationService.getConversationById(conversationId);
  }
}
