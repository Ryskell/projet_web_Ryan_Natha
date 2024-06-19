// src/services/conversation.service.ts
import { Injectable } from '@nestjs/common';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable()
export class ConversationService {
  private conversations: Conversation[] = [];
  private static idCounter: number = 1;

  createConversation(participants: User[]): Conversation {
    if (participants.some(participant => !participant)) {
      throw new Error('One or more participants not found');
    }
    const conversation = { id: `conv-${ConversationService.idCounter++}`, participants, messages: [] };
    this.conversations.push(conversation);
    return conversation;
  }

  getConversationsByUserId(userId: string): Conversation[] {
    return this.conversations.filter(conversation =>
      conversation.participants.some(participant => participant.id === userId),
    );
  }

  getConversationById(conversationId: string): Conversation {
    return this.conversations.find(conversation => conversation.id === conversationId);
  }

  addMessage(conversationId: string, message: Message): Conversation {
    const conversation = this.getConversationById(conversationId);
    if (conversation) {
      conversation.messages.push(message);
    }
    return conversation;
  }
}
