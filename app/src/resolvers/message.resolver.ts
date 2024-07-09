// message.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from '../modules/message/message.service';
import { Message } from '../models/message.model';
import { UserService } from '../modules/user/user.service';
import { ConversationService } from '../modules/conversation/conversation.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('conversationId') conversationId: string,
  ): Promise<Message> {
    const sender = await this.userService.findUserById(senderId);
    const conversation = await this.conversationService.findConversationById(conversationId);
    return this.messageService.createMessage(content, sender, conversation);
  }
}
