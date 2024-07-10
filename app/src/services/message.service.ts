// src/services/message.service.ts
import { Injectable } from '@nestjs/common';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable()
export class MessageService {
  private static idCounter: number = 1;

  createMessage(content: string, sender: User): Message {
    return { id: `msg-${MessageService.idCounter++}`, content, sender, timestamp: new Date() };
  }
}
