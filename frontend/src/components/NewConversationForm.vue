<template>
  <div>
    <input v-model="title" placeholder="Conversation title">
    <input v-model="userIds" placeholder="User IDs (comma separated)">
    <button @click="createConversation">Create</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default {
  setup(_, { emit }) {
    const title = ref('');
    const userIds = ref('');

    const CREATE_CONVERSATION = gql`
      mutation createConversation($data: ConversationInput!) {
        createConversation(data: $data)
      }
    `;

    const { mutate } = useMutation(CREATE_CONVERSATION);

    const createConversation = async () => {
      const userIdsArray = userIds.value.split(',').map(id => id.trim());
      await mutate({
        data: {
          title: title.value,
          userIds: userIdsArray
        }
      });
      title.value = '';
      userIds.value = '';
      emit('conversation-created');
      this.$router.push({ name: 'Conversations' });
    };

    return { title, userIds, createConversation };
  }
}
</script>
