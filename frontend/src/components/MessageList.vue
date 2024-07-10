<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message.id" class="message">
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery, useResult } from '@vue/apollo-composable';
import { watch } from 'vue';

const GET_MESSAGES_BY_CONVERSATION_ID = gql`
  query messagesByConversationId($conversationId: String!) {
    messagesByConversationId(conversationId: $conversationId) {
      id
      content
      from
      conversationId
    }
  }
`;

export default {
  props: ['conversationId'],
  setup(props) {
    const { result, loading, error, refetch } = useQuery(GET_MESSAGES_BY_CONVERSATION_ID, { conversationId: props.conversationId });
    const messages = useResult(result, [], data => data.messagesByConversationId);

    // Fonction pour rafraîchir les messages
    const refreshMessages = () => {
      refetch();
    };

    // Regarder les changements de conversationId pour refetcher les messages
    watch(() => props.conversationId, refreshMessages);

    return {
      messages,
      loading,
      error,
      refreshMessages
    };
  }
}
</script>

<style scoped>
.message-list {
  padding: 20px;
}

.message {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  position: relative;
}

.message:before {
  content: '';
  position: absolute;
  left: 10px;
  bottom: -10px;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #f9f9f9 transparent;
  display: block;
  width: 0;
}

.message:nth-child(even) {
  align-self: flex-end;
  background-color: #e1f7d5;
}

.message:nth-child(even):before {
  left: auto;
  right: 10px;
  border-color: #e1f7d5 transparent;
}
</style>
