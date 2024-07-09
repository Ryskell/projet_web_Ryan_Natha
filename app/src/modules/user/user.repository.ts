import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';

@Injectable()
export class UserRepository {
  private users: User[] = []; // Vous pouvez remplacer ceci par une base de données réelle

  async createUser(username: string, email: string): Promise<User> {
    const user = new User();
    user.id = Date.now().toString(); // Génération d'un ID unique
    user.username = username;
    user.email = email;
    user.createdAt = new Date();
    this.users.push(user);
    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
}
