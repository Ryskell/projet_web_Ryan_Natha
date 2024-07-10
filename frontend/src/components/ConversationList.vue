<template>
  <div class="conversation-list">
    <ul>
      <li v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation.id)">
        <div>
          <strong>{{ conversation.title }}</strong>
          <span>{{ conversation.time }}</span>
        </div>
        <div>{{ conversation.otherUserId }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const GET_CONVERSATIONS_BY_USER_ID = gql`
  query conversationByUserId($userId: String!) {
    conversationByUserId(userId: $userId) {
      id
      title
      userIds
    }
  }
`;

export default {
  setup() {
    const userId = '668e75717ca5b2b2867695ad';  // ID de l'utilisateur
    const conversations = ref([]);
    const router = useRouter();
    const { result, loading, error } = useQuery(GET_CONVERSATIONS_BY_USER_ID, { userId });

    watch(result, (newResult) => {
      if (newResult && newResult.conversationByUserId) {
        conversations.value = newResult.conversationByUserId.map(conversation => {
          const otherUserId = conversation.userIds.find(id => id !== userId);
          return {
            id: conversation.id,
            title: conversation.title,
            time: new Date().toLocaleTimeString(), // Vous pouvez ajuster cela en fonction de vos besoins
            otherUserId
          };
        });
      }
    }, { immediate: true });

    const selectConversation = (id) => {
      router.push({ name: 'ConversationMessages', params: { id } });
      setTimeout(() => {
        const event = new Event('change-convo');
        window.dispatchEvent(event);
      }, 0);
    };

    return {
      conversations,
      selectConversation,
      loading,
      error
    };
  }
}
</script>

<style scoped>
.conversation-list {
  width: 200px;
  border-right: 1px solid #ddd;
}

.conversation-list ul {
  list-style: none;
  padding: 0;
}

.conversation-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.conversation-list li div {
  display: flex;
  justify-content: space-between;
}

.conversation-list li:hover {
  background-color: #f0f0f0;
}
</style>
