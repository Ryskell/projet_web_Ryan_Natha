import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
    @Field(type => ID)
    id: string;

    @Field(type => String)
    title: string;

    @Field(type => [ID])
    messageIds: string[];

    @Field(type => [ID])
    userIds: string[];

    @Field(type => Int) 
    timestamp: number;
}
