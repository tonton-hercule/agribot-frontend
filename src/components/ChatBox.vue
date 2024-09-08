<!-- src/components/ChatBox.vue -->
<template>
  <div class="chat-box card">
    <div class="card-body">
      <div class="messages mb-3">
        <div v-for="(message, index) in messages" :key="index" class="message alert alert-secondary">
          <p class="mb-0">{{ message.text }}</p>
        </div>
      </div>
      <div class="input-group">
        <input
          v-model="userInput"
          type="text"
          class="form-control"
          placeholder="Type your message..."
          @keyup.enter="sendMessage"
          :disabled="!languageSelected"
        />
        <button class="btn btn-primary" @click="sendMessage" :disabled="!languageSelected">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  props: {
    languageSelected: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      userInput: '',
      messages: []
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim()) {
        this.messages.push({ text: this.userInput });
        this.userInput = '';
      }
    }
  }
};
</script>

<style scoped>
.chat-box {
  width: 100%;
  max-width: 600px;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 5px;
}
</style>
