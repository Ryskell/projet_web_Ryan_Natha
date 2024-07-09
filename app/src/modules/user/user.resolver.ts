import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../../models/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('username') username: string, @Args('email') email: string): Promise<User> {
    return this.userService.createUser(username, email);
  }
}
