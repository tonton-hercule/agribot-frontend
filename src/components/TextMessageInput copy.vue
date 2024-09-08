<template>
    <div class="text-message-input mt-3">
        <textarea v-model="message" class="form-control mb-3" placeholder="Type your message here..." rows="3"
            :disabled="!languageSelected || isRecording" v-if="!isRecording && !audioBlob"></textarea>

        <div class="action-buttons" v-if="!audioBlob">
            <button class="btn btn-secondary voice-btn" @click="toggleRecording" :disabled="!languageSelected">
                <span v-if="!isRecording">
                    🎤 Start Recording
                </span>
                <span v-else-if="isPaused">▶️ Continuer</span>
                <span v-else>⏸️ Pause</span>
            </button>
            <button v-if="isRecording" class="btn btn-danger" style="float: left;" @click="stopRecording">🛑 Stop</button>

            <button class="btn btn-primary send-btn" @click="sendMessage"
                :disabled="(!message && !isRecording) || !languageSelected">
                Send
            </button>
        </div>
        <div v-if="audioBlob" class="audio-preview">
            <audio :src="audioUrl" controls></audio>
            <button class="btn btn-primary send-btn me-2 mb-2" @click="sendAudio">
                Send
            </button>
            <button class="btn btn-danger reset-btn" @click="resetRecording">
                Reset
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TextMessageInput',
    props: {
        languageSelected: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            message: '',
            isRecording: false,
            isPaused: false,
            audioBlob: null,
            audioUrl: null,
            mediaRecorder: null,
            audioChunks: []
        };
    },
    methods: {
        sendMessage() {
            // Logique pour envoyer le message texte ou l'audio
            if (this.isRecording) {
                this.stopRecording();
            } else if (this.message.trim()) {
                this.$emit('send-message', this.message);
                this.message = ''; // Réinitialiser le champ de saisie après l'envoi
            }
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
        startRecording() {
            if (!this.isRecording) {
                this.isRecording = true;
                navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.start();
                    this.audioChunks = [];
                    this.mediaRecorder.ondataavailable = (event) => {
                        this.audioChunks.push(event.data);
                    };
                    this.mediaRecorder.onstop = () => {
                        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
                        this.audioUrl = URL.createObjectURL(this.audioBlob);
                    };
                });
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
        pauseRecording() {
            if (this.isRecording && this.mediaRecorder) {
                this.isRecording = false;
                this.mediaRecorder.stop();
            }
        },
        sendAudio() {
            alert('Audio envoyé !');
        },
        resetRecording() {
            this.audioBlob = null;
            this.audioUrl = null;
            this.isRecording = false;
            this.message = '';
        }
    }
};
</script>

<style scoped>
.text-message-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

textarea.form-control {
    width: 100%;
    min-width: 300px;
    border: 2px solid #007bff;
    border-radius: 10px;
    padding: 10px;
    font-size: 1rem;
    color: #333;
    background-color: #fff;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

textarea.form-control:focus {
    border-color: #0056b3;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button.voice-btn,
button.send-btn {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button.voice-btn {
    background-color: #28a745;
    /* Couleur verte pour le bouton d'enregistrement */
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
}

button.voice-btn:hover {
    background-color: #218838;
    box-shadow: 0 6px 12px rgba(40, 167, 69, 0.3);
}

button.send-btn {
    background-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

button.send-btn:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 12px rgba(0, 123, 255, 0.3);
}

button.send-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    box-shadow: none;
}

.audio-preview {
    margin-top: 20px;
    display: flex;
    align-items: center;
}

audio {
    margin-right: 20px;
    width: 100%;
}

button.reset-btn {
    background-color: #dc3545;
    padding: 10px 15px;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button.reset-btn:hover {
    background-color: #c82333;
    box-shadow: 0 6px 12px rgba(220, 53, 69, 0.3);
}
</style>