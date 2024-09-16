<!-- src/pages/ChatPage.vue -->
<template>
  <div class="chat-page d-flex flex-column align-items-center justify-content-center">
    <LanguageSelector @language-selected="setLanguage" />
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-8">
          <TextMessageInput :languageSelected="languageSelected" :languageValue="languageValue" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LanguageSelector from '../components/LanguageSelector.vue';
import TextMessageInput from '../components/TextMessageInput.vue';

export default {
  name: 'ChatPage',
  components: {
    LanguageSelector,
    TextMessageInput
  },
  data() {
    return {
      languageSelected: false,
      languageValue: ""
    };
  },
  methods: {
    setLanguage(selectedLanguage) {
      this.languageSelected = true;
      this.languageValue = selectedLanguage
    }
  }
};
</script>

<style scoped>
.chat-page {
  height: 100vh;
  padding: 20px;
}

@media (max-width: 600px) {
  .chat-page {
    padding: 10px;
  }
}
</style>
