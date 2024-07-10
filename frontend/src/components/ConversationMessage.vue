<template>
  <div>
    <MessageList ref="messageList" :conversationId="id" />
    <MessageForm :conversationId="id" @message-sent="refreshMessages" />
  </div>
</template>

<script>
import MessageList from './MessageList.vue';
import MessageForm from './MessageForm.vue';

export default {
  components: {
    MessageList,
    MessageForm
  },
  props: ['id'],
  methods: {
    refreshMessages() {
      this.$refs.messageList.refreshMessages();
    }
  }
}
</script>
