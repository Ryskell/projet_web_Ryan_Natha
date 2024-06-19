import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Result {
  @Field()
  result: string;
}
