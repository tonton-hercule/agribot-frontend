<!-- src/components/LanguageSelector.vue -->
<template>
    <div class="language-selector text-center">
      <h3>Langues disponibles:</h3>
      <div class="btn-group" role="group">
        <label
          v-for="(language, index) in languages"
          :key="index"
          class="btn btn-outline-secondary btn-lg border border-primary"
        >
          <input
            type="radio"
            name="language"
            :value="language.code"
            v-model="selectedLanguage"
            @change="selectLanguage"
          />
          {{ language.name }}
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LanguageSelector',
    data() {
      return {
        selectedLanguage: null,
        languages: [
          { code: 'fr', name: 'Français' },
          { code: 'en', name: 'Englais' },
          { code: 'yo', name: 'Yoruba' },
          //{ code: 'fon', name: 'Fon' },
        ]
      };
    },
    methods: {
      selectLanguage() {
        this.$emit('language-selected', this.selectedLanguage);
      }
    }
  };
  </script>
  
  <style scoped>
  .language-selector {
    margin-bottom: 0px;
  }
  </style>
  