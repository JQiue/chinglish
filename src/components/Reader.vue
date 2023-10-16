<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps<{ content?: string }>();

const title = ref('沉浸式阅读');
const contentSegment = ref<string[]>([]);
const voices = ref<Record<string, any>>([]);

function toSegment(content: string) {
  contentSegment.value = contentSegment.value.concat(content.split('\n'));
}

function speech(content: string) {
  const speech = window.speechSynthesis;
  voices.value = speech.getVoices();
  const synth = new SpeechSynthesisUtterance();
  synth.text = content;
  synth.pitch = 1;
  synth.rate = 1;
  synth.lang = 'en-US'
  // synth.voice
  speech.speak(synth);
}

const voiceNames = computed(() => {
  const names = voices.value.map((item: any) => item.name);
  return names;
})

onMounted(async () => {
  if (props.content) {
    toSegment(props.content)
  }
});
</script>

<template>
  <div class="reader-container">
    <div class="reader-top">
      <div></div>
      <div></div>
      <div class="btn-group">
        <v-btn variant="text" :border="0" @click="speech(props.content ?? '')">朗读选项
          <v-menu activator="parent" :close-on-content-click="false">
            速度
            <v-slider></v-slider>
            选择语音
            <v-select density="compact" label="Select" :items="voiceNames" variant="outlined"></v-select>
          </v-menu>
        </v-btn>
        <v-btn variant="text">
          文本首选项
          <v-menu activator="parent" :close-on-content-click="false">
            文字大小
            <v-slider></v-slider>
            文字间距
            <v-slider></v-slider>
            字体
            <v-select density="compact" label="Select" :items="voiceNames" variant="outlined"></v-select>
            背景
          </v-menu>
        </v-btn>
        <v-btn variant="text">阅读偏好</v-btn>
      </div>
    </div>
    <div class="reader-content-container">
      <div class="reader-header">
        <div class="reader-header-content">
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
      <div class="reader-content-body">
        <p v-for="text in contentSegment">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reader-container {
  font-family: "Sitka Text", Georgia, Cambria, Calibri;
  line-height: 160%;
  background-color: #F9F5E9;
  min-height: 100vh;
}

.reader-content-container {
  max-width: 45rem;
  padding-top: 1.973rem !important;
  padding-left: 2.444rem;
  padding-right: 2.444rem;
  padding-bottom: 2.444rem;
  margin-left: auto;
  margin-right: auto;
}

.reader-content-body {
  font-size: 114%;
}

.title {
  font-size: 2.412rem;
  font-family: "Sitka Heading", Georgia, Cambria, Calibri;
  line-height: normal;
  margin-top: 0px !important;
  margin-bottom: 1.535rem;
}

.reader-top {
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-group {
  display: flex;
}
</style>
