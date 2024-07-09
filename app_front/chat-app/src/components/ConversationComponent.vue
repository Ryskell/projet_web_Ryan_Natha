<template>
  <div class="conversation">
    <MessageList :messages="messages" />
    <MessageInput @sendMessage="sendMessage" />
  </div>
</template>

<script>
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';

export default {
  name: 'ConversationComponent',
  props: ['conversationId'],
  components: {
    MessageList,
    MessageInput
  },
  data() {
    return {
      messages: [
        { id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { id: 2, content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
        { id: 3, content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
        { id: 4, content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
      ]
    }
  },
  methods: {
    sendMessage(content) {
      const newMessage = { id: this.messages.length + 1, content: content };
      this.messages.push(newMessage);
    }
  }
}
</script>

<style scoped>
.conversation {
  padding: 20px;
}
</style>
