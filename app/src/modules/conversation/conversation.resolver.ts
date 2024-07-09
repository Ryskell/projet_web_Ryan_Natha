import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from '../../models/conversation.model';
import { User } from '../../models/user.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => Conversation, { name: 'conversation' })
  async getConversation(@Args('id') id: string): Promise<Conversation> {
    return this.conversationService.findConversationById(id);
  }

  @Mutation(() => Conversation)
  async createConversation(@Args('participantIds', { type: () => [String] }) participantIds: string[]): Promise<Conversation> {
    // Logique pour récupérer les utilisateurs à partir des IDs et créer une conversation
    const participants = participantIds.map(id => ({ id } as User));
    return this.conversationService.createConversation(participants);
  }
}
