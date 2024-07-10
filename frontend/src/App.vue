<template>
  <div id="app">
    <div class="container">
      <conversation-list class="conversation-list"></conversation-list>
      <router-view class="message-list"></router-view>
    </div>
  </div>
</template>

<script>
import ConversationList from './components/ConversationList.vue';

export default {
  components: {
    ConversationList,
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.conversation-list {
  width: 30%;
}

.message-list {
  width: 70%;
}
</style>
