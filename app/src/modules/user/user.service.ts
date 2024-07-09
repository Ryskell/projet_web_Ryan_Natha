import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // Méthodes pour gérer les utilisateurs
  async createUser(username: string, email: string): Promise<User> {
    // Logique pour créer un utilisateur
    return this.userRepository.createUser(username, email);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findUserById(id);
  }
}
