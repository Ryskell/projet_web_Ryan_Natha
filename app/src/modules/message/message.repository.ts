import { Injectable } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Conversation } from '../../models/conversation.model';

@Injectable()
export class MessageRepository {
  private messages: Message[] = [];

  async createMessage(message: Message): Promise<Message> {
    this.messages.push(message);
    return message;
  }

  async findMessageById(id: string): Promise<Message> {
    const message = this.messages.find((message) => message.id === id);
    if (!message) {
      throw new Error(`Message with ID ${id} not found`);
    }
    return message;
  }
}
