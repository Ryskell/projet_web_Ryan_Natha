import { Resolver, Query } from '@nestjs/graphql';
import { Result } from './app.types';

@Resolver()
export class AppResolver {
  @Query(() => Result)
  getResult(): Result {
    return { result: 'ok' };
  }
}
