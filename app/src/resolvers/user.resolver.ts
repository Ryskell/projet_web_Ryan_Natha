// src/resolvers/user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) { }

  @Mutation(() => User)
  createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): User {
    return this.userService.createUser(name, email);
  }
}
