<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message.id" class="message">
      {{ message.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: ['messages']
}
</script>

<style scoped>
.message-list {
  height: 300px;
  overflow-y: auto;
}

.message {
  background-color: #e5f1fb;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}

.message:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #e5f1fb;
  border-bottom: 0;
  margin-left: -10px;
  margin-bottom: -10px;
}
</style>
