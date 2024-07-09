import { Injectable } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { MessageRepository } from './message.repository';
import { UserRepository } from '../user/user.repository';
import { ConversationRepository } from '../conversation/conversation.repository';
import { User } from '../../models/user.model';
import { Conversation } from '../../models/conversation.model';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly userRepository: UserRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  async createMessage(
    content: string,
    sender: User,
    conversation: Conversation,
  ): Promise<Message> {
    const message = new Message();
    message.id = Date.now().toString(); // Génération d'un ID unique
    message.content = content;
    message.sender = sender;
    message.conversation = conversation;
    message.createdAt = new Date();
    return this.messageRepository.createMessage(message);
  }

  async findMessageById(id: string): Promise<Message> {
    return this.messageRepository.findMessageById(id);
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async findConversationById(id: string): Promise<Conversation> {
    const conversation =
      await this.conversationRepository.findConversationById(id);
    if (!conversation) {
      throw new Error(`Conversation with ID ${id} not found`);
    }
    return conversation;
  }
}
