// conversation.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ConversationService } from '../modules/conversation/conversation.service';
import { Conversation } from '../models/conversation.model';
import { UserService } from '../modules/user/user.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Conversation)
  async createConversation(
    @Args('participantIds', { type: () => [String] }) participantIds: string[],
  ): Promise<Conversation> {
    const participants = await Promise.all(participantIds.map(id => this.userService.findUserById(id)));
    return this.conversationService.createConversation(participants);
  }

  @Query(() => [Conversation], { name: 'userConversations' })
  async getUserConversations(@Args('userId') userId: string): Promise<Conversation[]> {
    return this.conversationService.findUserConversations(userId);
  }

  @Query(() => Conversation, { name: 'conversation' })
  async getConversation(@Args('id') id: string): Promise<Conversation> {
    return this.conversationService.findConversationById(id);
  }
}
