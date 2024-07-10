// src/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private users: User[] = [];
  private static idCounter: number = 1;

  createUser(name: string, email: string): User {
    const user = { id: UserService.idCounter.toString(), name, email };
    UserService.idCounter++;
    this.users.push(user);
    return user;
  }

  getUserById(id: string): User {
    return this.users.find(user => user.id === id);
  }
}
