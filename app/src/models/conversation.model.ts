// src/models/conversation.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.model';
import { Message } from './message.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [User])
  participants: User[];

  @Field(() => [Message])
  messages: Message[];
}
