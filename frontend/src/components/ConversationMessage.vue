<template>
  <div>
    <MessageList ref="messageList" :conversationId="currentId" />
    <MessageForm :conversationId="currentId" @message-sent="refreshMessages" />
  </div>
</template>

<script>
import MessageList from './MessageList.vue';
import MessageForm from './MessageForm.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  components: {
    MessageList,
    MessageForm
  },
  props: ['id'],
  setup(props) {
    const currentId = ref(props.id);
    const messageListRef = ref(null);

    const handleMessageSent = () => {
      console.log("handleMessageSent called");
      setTimeout(() => {
        console.log("Calling refreshMessages from handleMessageSent");
        if (messageListRef.value) {
          messageListRef.value.refreshMessages();
        }
      }, 100);  // Appeler refreshMessages après un court délai
    };

    onMounted(() => {
      window.addEventListener('change-convo', handleMessageSent);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('change-convo', handleMessageSent);
    });

    return {
      currentId,
      messageListRef,
      handleMessageSent
    };
  },
  methods: {
    refreshMessages() {
      if (this.$refs.messageList) {
        console.log("Calling refreshMessages from parent method");
        this.$refs.messageList.refreshMessages();
      }
    }
  }
}
</script>
