import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { QueueService } from '../../queue/queue.service';
import { Message } from '../../models/message.model';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from '../../models/user.model';
import { Conversation } from '../../models/conversation.model';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly queueService: QueueService,
  ) {}

  @Query(() => Message, { name: 'message' })
  async getMessage(@Args('id') id: string): Promise<Message> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    const message = await this.messageService.findMessageById(id);
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  @Mutation(() => Boolean)
  async sendMessage(
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('conversationId') conversationId: string,
  ): Promise<boolean> {
    if (!content || !senderId || !conversationId) {
      throw new BadRequestException(
        'Content, senderId, and conversationId are required',
      );
    }

    const sender: User = await this.messageService.findUserById(senderId);
    const conversation: Conversation =
      await this.messageService.findConversationById(conversationId);

    const message: Message = {
      id: Date.now().toString(), // Replace this with your ID generation logic
      content,
      sender,
      conversation,
      createdAt: new Date(),
    };

    try {
      await this.queueService.addMessageToQueue(message);
    } catch (error) {
      throw new BadRequestException('Failed to add message to the queue');
    }

    return true;
  }
}
