import { Injectable } from '@nestjs/common';
import { Conversation } from '../models/conversation.model';

@Injectable()
export class MemoryStoreService {
  private static instance: MemoryStoreService;
  private conversations: Conversation[] = [];

  private constructor() { }

  public static getInstance(): MemoryStoreService {
    if (!MemoryStoreService.instance) {
      MemoryStoreService.instance = new MemoryStoreService();
    }
    return MemoryStoreService.instance;
  }

  getConversations(): Conversation[] {
    return this.conversations;
  }

  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
  }

  getConversationById(conversationId: string): Conversation {
    return this.conversations.find(conv => conv.id === conversationId);
  }

  addMessageToConversation(conversationId: string, message: any): Conversation {
    const conversation = this.getConversationById(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    conversation.messages.push(message);
    return conversation;
  }
}
