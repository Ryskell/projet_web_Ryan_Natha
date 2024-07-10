import { Injectable } from '@nestjs/common';
import { Conversation } from '../models/conversation.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { MemoryStoreService } from './memory-store.service';

@Injectable()
export class ConversationService {
  private static idCounter: number = 1;

  constructor(private memoryStoreService: MemoryStoreService) { }

  createConversation(participants: User[]): Conversation {
    if (participants.some(participant => !participant)) {
      throw new Error('One or more participants not found');
    }
    const conversation = { id: `conv-${ConversationService.idCounter++}`, participants, messages: [] };
    this.memoryStoreService.addConversation(conversation);
    console.log(`Conversation created: ${JSON.stringify(conversation)}`);
    return conversation;
  }

  getConversationsByUserId(userId: string): Conversation[] {
    return this.memoryStoreService.getConversations().filter(conversation =>
      conversation.participants.some(participant => participant.id === userId),
    );
  }

  getConversationById(conversationId: string): Conversation {
    return this.memoryStoreService.getConversationById(conversationId);
  }

  addMessage(conversationId: string, message: Message): Conversation {
    return this.memoryStoreService.addMessageToConversation(conversationId, message);
  }
}
