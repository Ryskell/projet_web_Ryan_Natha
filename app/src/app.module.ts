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
import { QueueModule } from './queues/queue.module';
import { memoryStoreProvider } from './services/memory-store.provider';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    QueueModule,
  ],
  providers: [
    UserResolver,
    ConversationResolver,
    MessageResolver,
    UserService,
    ConversationService,
    MessageService,
    memoryStoreProvider,
  ],
})
export class AppModule { }
