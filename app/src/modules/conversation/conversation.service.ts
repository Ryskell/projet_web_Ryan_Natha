// conversation.service.ts
import { Injectable } from '@nestjs/common';
import { Conversation } from '../../models/conversation.model';
import { ConversationRepository } from './conversation.repository';
import { User } from '../../models/user.model';
import { UserRepository } from '../user/user.repository'; // Importez le repository User si vous l'utilisez

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createConversation(participants: User[]): Promise<Conversation> {
    return this.conversationRepository.createConversation(participants);
  }

  async findConversationById(id: string): Promise<Conversation> {
    return this.conversationRepository.findConversationById(id);
  }

  async findUserConversations(userId: string): Promise<Conversation[]> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, retournez une liste vide de conversations
      return [];
    }
    // Implémentez ici la logique pour récupérer les conversations de l'utilisateur
    // return user.conversations; // Assurez-vous que votre modèle User a une propriété 'conversations'
    // Remplacez cette ligne par votre logique réelle
  }
}
