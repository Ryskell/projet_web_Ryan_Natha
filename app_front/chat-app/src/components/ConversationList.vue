<template>
  <div class="conversation-list">
    <ul>
      <li v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation.id)">
        <div class="name">{{ conversation.name }}</div>
        <div class="last-message">{{ conversation.lastMessage }}</div>
        <div class="timestamp">{{ conversation.timestamp }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ConversationListComponent',
  data() {
    return {
      conversations: [
        { id: 1, name: 'John Doe', lastMessage: 'Hey', timestamp: '12:09' },
        { id: 2, name: 'Margaret Hamilton', lastMessage: 'Hey', timestamp: '11:54' },
        { id: 3, name: 'Niklaus Wirth', lastMessage: 'Hey', timestamp: '10:25' },
        { id: 4, name: 'Larry Page', lastMessage: 'Hey', timestamp: '10:10' },
        { id: 5, name: 'James Gosling', lastMessage: 'Hey', timestamp: '09:46' },
        { id: 6, name: 'Ken Thompson', lastMessage: 'Hey', timestamp: '09:34' },
        { id: 7, name: 'Linus Torvalds', lastMessage: 'Hey', timestamp: '08:56' },
        { id: 8, name: 'Grace Hopper', lastMessage: 'Hey', timestamp: '16/05' },
        { id: 9, name: 'Ada Lovelace', lastMessage: 'Hey', timestamp: '12/05' },
      ]
    };
  },
  methods: {
    selectConversation(id) {
      this.$emit('select-conversation', id);
    }
  }
}
</script>

<style scoped>
.conversation-list ul {
  list-style-type: none;
  padding: 0;
}

.conversation-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.conversation-list li:hover {
  background-color: #f0f0f0;
}

.name {
  font-weight: bold;
}

.last-message {
  color: gray;
}

.timestamp {
  float: right;
  color: gray;
}
</style>
