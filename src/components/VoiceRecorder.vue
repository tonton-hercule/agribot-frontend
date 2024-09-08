<template>
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-md-8">
                <div class="voice-recorder mt-3 ">
                    <!-- Zone de saisie texte ou message -->
                    <TextMessageInput v-if="!isRecording && !audioBlob" :languageSelected="languageSelected"
                        @send-message="handleTextMessage" />

                    <!-- Bouton pour enregistrer ou continuer l'enregistrement -->
                    <div v-if="!audioBlob">
                        <button class="btn btn-danger me-2" @click="toggleRecording" :disabled="!languageSelected">
                            <span v-if="!isRecording">🎙️ Audio</span>
                            <span v-else-if="isPaused">▶️ Continuer</span>
                            <span v-else>⏸️ Pause</span>
                        </button>
                        <button v-if="isRecording" class="btn btn-danger me-2" @click="stopRecording">🛑 Stop</button>
                    </div>

                    <!-- Lecteur audio et boutons après enregistrement -->
                    <div v-if="audioBlob" class="audio-controls d-flex align-items-center justify-content-center mt-3">
                        <audio ref="audioPlayer" :src="audioUrl" controls class="me-3"></audio>
                        <button class="btn btn-success me-2" @click="sendAudio">Envoyer</button>
                        <button class="btn btn-warning" @click="resetRecording">Réinitialiser</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextMessageInput from './TextMessageInput.vue';

export default {
    name: 'VoiceRecorder',
    components: {
        TextMessageInput
    },
    props: {
        languageSelected: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isRecording: false,
            isPaused: false,
            mediaRecorder: null,
            audioChunks: [],
            audioBlob: null,
            audioUrl: null
        };
    },
    methods: {
        handleTextMessage(message) {
            // Logique pour gérer le message texte envoyé
            alert(`Message envoyé : ${message}`);
        },
        async toggleRecording() {
            if (this.isRecording && !this.isPaused) {
                this.isPaused = true;
                this.mediaRecorder.pause();
            } else if (this.isPaused) {
                this.isPaused = false;
                this.mediaRecorder.resume();
            } else {
                this.isRecording = true;
                this.isPaused = false;
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.start();

                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                };
            }
        },
        stopRecording() {
            if (this.isRecording) {
                this.mediaRecorder.stop();
                this.mediaRecorder.onstop = () => {
                    this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                    this.audioUrl = URL.createObjectURL(this.audioBlob);
                    this.audioChunks = [];
                };
                this.isRecording = false;
                this.isPaused = false;
            }
        },
        sendAudio() {
            alert('Audio envoyé !');
        },
        resetRecording() {
            this.audioBlob = null;
            this.audioUrl = null;
        }
    }
};
</script>

<style scoped>
.voice-recorder {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.audio-controls {
    width: 100%;
    text-align: center;
}

audio {
    width: 300px;
}
</style>