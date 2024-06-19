// src/app.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './resolvers/user.resolver';
import { ConversationResolver } from './resolvers/conversation.resolver';
import { MessageResolver } from './resolvers/message.resolver';
import { UserService } from './services/user.service';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    UserResolver,
    ConversationResolver,
    MessageResolver,
    UserService,
    ConversationService,
    MessageService,
  ],
})
export class AppModule { }
