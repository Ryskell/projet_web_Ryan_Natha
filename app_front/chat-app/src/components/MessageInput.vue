<template>
  <div class="message-input">
    <input v-model="content" placeholder="Type a message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    sendMessage() {
      this.$emit('sendMessage', this.content);
      this.content = '';
    }
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  margin-top: 10px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px;
}
</style>
