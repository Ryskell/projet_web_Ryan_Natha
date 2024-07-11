<template>
  <div class="conversation-list">
    <button class="create-conversation-button" @click="showCreateConversation = true">Create Conversation</button>
    <ul>
      <li v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation.id)">
        <div>
          <strong>{{ conversation.title }}</strong>
          <span>{{ conversation.time }}</span>
        </div>
        <div>{{ conversation.otherUserId }}</div>
      </li>
    </ul>

    <div v-if="showCreateConversation" class="modal">
      <div class="modal-content">
        <h3>Create a New Conversation</h3>
        <label>
          Title:
          <input v-model="newConversationTitle" placeholder="Enter conversation title" />
        </label>
        <div v-if="loadingUsersData">Loading users...</div>
        <div v-else>
          <label>
            Select User:
            <select v-model="selectedUserId">
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.username }} ({{ user.email }})
              </option>
            </select>
          </label>
          <div class="modal-buttons">
            <button class="button-primary" @click="createNewConversation">Create Conversation</button>
            <button class="button-secondary" @click="showCreateConversation = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@vue/apollo-composable';

const GET_CONVERSATIONS_BY_USER_ID = gql`
  query conversationByUserId($userId: String!) {
    conversationByUserId(userId: $userId) {
      id
      title
      userIds
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      id
      email
      username
    }
  }
`;

const CREATE_CONVERSATION = gql`
  mutation createConversation($data: ConversationInput!) {
    createConversation(data: $data)
  }
`;

export default {
  data() {
    return {
      userId: '668e75717ca5b2b2867695ad',
      conversations: [],
      users: [],
      newConversationTitle: '',
      selectedUserId: null,
      showCreateConversation: false,
      loadingData: false,
      loadingUsersData: false,
      errorData: null,
    };
  },
  setup() {
    const { result: conversationsResult, loading, error, refetch } = useQuery(GET_CONVERSATIONS_BY_USER_ID, { userId: '668e75717ca5b2b2867695ad' });
    const { result: usersResult, loading: loadingUsers } = useQuery(GET_USERS);
    const { mutate: createConversation } = useMutation(CREATE_CONVERSATION);

    return {
      conversationsResult,
      loading,
      error,
      refetch,
      usersResult,
      loadingUsers,
      createConversation,
    };
  },
  watch: {
    conversationsResult(newResult) {
      if (newResult && newResult.conversationByUserId) {
        this.conversations = newResult.conversationByUserId.map(conversation => {
          const otherUserId = conversation.userIds.find(id => id !== this.userId);
          return {
            id: conversation.id,
            title: conversation.title,
            time: new Date().toLocaleTimeString(),
            otherUserId
          };
        });
      }
    },
    usersResult(newResult) {
      if (newResult && newResult.users) {
        this.users = newResult.users.filter(user => user.id !== this.userId);
      }
    }
  },
  methods: {
    selectConversation(id) {
      this.$router.push({ name: 'ConversationMessages', params: { id } });
      setTimeout(() => {
        const event = new Event('change-convo');
        window.dispatchEvent(event);
      }, 0);
    },
    async createNewConversation() {
      console.log('Creating new conversation');
      if (!this.newConversationTitle || !this.selectedUserId) {
        alert('Please enter a title and select a user.');
        return;
      }
      try {
        const data = {
          title: this.newConversationTitle,
          userIds: [this.userId, this.selectedUserId]
        };
        console.log('Sending mutation', { data });
        await this.createConversation({
          variables: {
            title: this.newConversationTitle,
            userIds: [this.userId, this.selectedUserId]
          }
        });
        console.log('Conversation created');
        this.newConversationTitle = '';
        this.selectedUserId = null;
        this.showCreateConversation = false;
        this.refetch();
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    }
  }
}
</script>

<style scoped>
.conversation-list {
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
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

.create-conversation-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.create-conversation-button:hover {
  background-color: #0056b3;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 10px;
  width: 300px;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-content h3 {
  margin-bottom: 20px;
}

.modal-content label {
  margin-bottom: 10px;
}

.modal-content input,
.modal-content select {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.button-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button-primary:hover {
  background-color: #0056b3;
}

.button-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button-secondary:hover {
  background-color: #5a6268;
}
</style>
