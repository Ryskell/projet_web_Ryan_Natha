<template>
  <div id="app" class="app-container">
    <div class="sidebar">
      <ConversationListComponent @select-conversation="selectConversation" />
    </div>
    <div class="content">
      <ConversationComponent v-if="selectedConversationId" :conversationId="selectedConversationId" />
    </div>
  </div>
</template>

<script>
import ConversationListComponent from './components/ConversationList.vue';
import ConversationComponent from './components/ConversationComponent.vue';

export default {
  name: 'App',
  components: {
    ConversationListComponent,
    ConversationComponent
  },
  data() {
    return {
      selectedConversationId: null
    }
  },
  methods: {
    selectConversation(id) {
      this.selectedConversationId = id;
    }
  }
}
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
