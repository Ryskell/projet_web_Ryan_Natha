import { Injectable } from '@nestjs/common';
import { Conversation } from '../../models/conversation.model';
import { User } from '../../models/user.model';

@Injectable()
export class ConversationRepository {
  private conversations: Conversation[] = [];

  async createConversation(participants: User[]): Promise<Conversation> {
    const conversation = new Conversation();
    conversation.id = Date.now().toString(); // Génération d'un ID unique
    conversation.participants = participants;
    conversation.createdAt = new Date();
    this.conversations.push(conversation);
    return conversation;
  }

  async findConversationById(id: string): Promise<Conversation> {
    return this.conversations.find(conversation => conversation.id === id);
  }
}
