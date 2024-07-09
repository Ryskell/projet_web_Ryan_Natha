import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class SimpleResult {
  @Field()
  result: string;
}

@Resolver()
export class SimpleResolver {
  @Query(() => SimpleResult)
  simpleQuery(): SimpleResult {
    return { result: 'ok' };
  }
}
