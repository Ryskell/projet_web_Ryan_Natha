<template>
  <form @submit.prevent="addMessage">
    <input v-model="newMessage" placeholder="Enter your message" required />
    <button type="submit">Send</button>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';

const SEND_MESSAGE = gql`
  mutation sendMessage($data: MessageInput!) {
    sendMessage(data: $data)
  }
`;

export default {
  props: ['conversationId'],
  data() {
    return {
      newMessage: ''
    };
  },
  setup() {
    const { mutate: sendMessage } = useMutation(SEND_MESSAGE);
    return { sendMessage };
  },
  methods: {
    async addMessage() {
      if (this.newMessage.trim() !== '') {
        try {
          await this.sendMessage({
            data: {
              content: this.newMessage,
              from: "668e75717ca5b2b2867695ad",
              conversationId: this.conversationId
            }
          });
          this.newMessage = '';
          this.$emit('message-sent');
          console.log("Event 'message-sent' emitted");
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 5px;
}

button {
  padding: 5px 10px;
}
</style>
