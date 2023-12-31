<script setup lang="ts">
import { ref, computed, watch, CSSProperties, onMounted, reactive } from 'vue';
import { getReaderStyleConfig, setReaderStyleConfig } from '../localdata/index';
import { unfamiliarWordsTable } from '../db/services';
import { audio } from '@/helpers/audio';
import { dictTable } from '@/db/dict';
import Segment from '../components/Segment.vue';

const props = defineProps<{ title?: string, content?: string }>();

/** 阅读器元素  */
const reader = ref<HTMLDivElement>();
/** 段落元素  */
const segment = ref<HTMLParagraphElement>();
/** 标题  */
const title = ref<string | undefined>('沉浸式阅读');
/** 内容段落  */
const contentSegment = ref<string[]>([]);
/** 语音列表  */
const voices = ref<Record<string, any>>([]);
/** 阅读器样式  */
const styleConfig = reactive<CSSProperties>({
  fontSize: '1rem',
  lineHeight: 1,
  fontFamily: ''
});
const font = ref<'Default' | 'Helvetica' | 'Roboto'>('Default');
const fontSize = ref();
const lineHeight = ref();
const selectedWord = ref('');
const fontFamilyList = ref(['Default', 'Helvetica', 'Roboto']);
const x = ref(0);
const y = ref(0);
const showPopover = ref(false);

const handleFontSize = (size: number) => {
  styleConfig.fontSize = size + 'rem';
}

const handleLineHeight = (size: number) => {
  styleConfig.lineHeight = size;
}

const handleFontFamily = (font: 'Default' | 'Helvetica' | 'Roboto') => {
  if (font == 'Default') {
    styleConfig.fontFamily = '';
  }
  if (font == 'Roboto') {
    styleConfig.fontFamily = 'Roboto';
  }
  if (font == 'Helvetica') {
    styleConfig.fontFamily = 'Helvetica';
  }
}

/** 将内容处理成段 */
function toSegment(content: string | undefined) {
  contentSegment.value = [];
  if (content) {
    contentSegment.value = contentSegment.value.concat(content.split('\n'));
  }
}

/** 朗读 */
const handleRead = (content: string) => {
  audio(content);
}

// const speech = (content: string) => {
//   const speech = window.speechSynthesis;
//   voices.value = speech.getVoices();
//   const synth = new SpeechSynthesisUtterance();
//   synth.text = content;
//   synth.pitch = 1;
//   synth.rate = 1;
//   synth.lang = 'en-US'
//   // synth.voice
//   speech.speak(synth);
// }

const voiceNames = computed(() => {
  const names = voices.value.map((item: any) => item.name);
  return names;
})

const handleQueryWord = async (word: string) => {
  if (dictTable) {
    const data = await dictTable.getWord(word);
    console.log(data);
  }
}

watch(props, () => {
  title.value = props.title;
  toSegment(props.content);
})

watch(fontSize, (value) => {
  handleFontSize(value);
  setReaderStyleConfig(styleConfig);
})

watch(lineHeight, (value) => {
  handleLineHeight(value)
  setReaderStyleConfig(styleConfig);
})

watch(font, (value) => {
  handleFontFamily(value);
  setReaderStyleConfig(styleConfig);
})

onMounted(() => {
  styleConfig.fontSize = getReaderStyleConfig()?.fontSize || 1;
  styleConfig.lineHeight = getReaderStyleConfig()?.lineHeight || 1;
  styleConfig.fontFamily = getReaderStyleConfig()?.fontFamily || '';
  font.value = getReaderStyleConfig()?.fontFamily || 'Default';
  fontSize.value = getReaderStyleConfig()?.fontSize || 1;
  lineHeight.value = getReaderStyleConfig()?.lineHeight || 1;

  /** 选中抬起时弹出 */
  segment.value?.addEventListener('mouseup', (e) => {
    showPopover.value = false;
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection?.getRangeAt(0);
    if (!range) return;
    const text = range?.toString();
    if (text.length == 0) return;
    selectedWord.value = text?.trim();
    x.value = e.clientX;
    y.value = e.clientY;
    showPopover.value = true;
  });

  /** 处理双击选中 */
  reader.value?.addEventListener('dblclick', () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount !== 1) {
      return;
    }
    const range = selection.getRangeAt(0);
    const text = range.toString();
    const matches = text.match(/^\w+(\s+)$/);
    if (!matches) {
      return;
    }
    const spaceCount = matches[1].length;
    selection.removeAllRanges();
    range.setEnd(range.endContainer, range.endOffset - spaceCount);
    selection.addRange(range);
  }, false)
})
</script>

<template>
  <div class="reader-container" ref="reader">
    <div class="reader-top">
      <div></div>
      <div></div>
      <div class="btn-group">
        <!-- <n-button-group size="small">
          <n-button type="default">
            <span>
              朗读选项
            </span>
            <v-menu activator="parent" :close-on-content-click="false">
              速度
              <v-slider></v-slider>
              选择语音
              <v-select density="compact" label="Select" :items="voiceNames" variant="outlined"></v-select>
            </v-menu>
          </n-button>
          <n-button type="default">
            文本首选项
          </n-button>
          <n-button type="default">
            阅读偏好
          </n-button>
        </n-button-group> -->
        <v-btn variant="text" :border="0" @click="handleRead(props.content ?? '')">
          <span>
            朗读选项
          </span>
          <v-menu activator="parent" :close-on-content-click="false">
            速度
            <v-slider></v-slider>
            选择语音
            <v-select density="compact" label="Select" :items="voiceNames" variant="outlined"></v-select>
          </v-menu>
        </v-btn>
        <v-btn variant="text">
          <span>
            文本首选项
          </span>
          <v-menu activator="parent" :close-on-content-click="false">
            文字大小
            <v-slider v-model="fontSize" :thumb-size="14" :min="1" :max="1.8" step="0.2" show-ticks :ticks="{
              1: '小',
              1.4: '中',
              1.8: '大',
            }"></v-slider>
            文字间距
            <v-slider v-model="lineHeight" :thumb-size="14" :min="0.8" :max="1.6" step="0.2 " show-ticks></v-slider>
            字体
            <v-radio-group v-model="font" @update="handleFontFamily">
              <v-radio v-for="font in fontFamilyList" :key="font" :label="font" :value="font"></v-radio>
            </v-radio-group>
            <!-- <n-radio-group v-model:value="font" name="radiogroup" @update:value="handleFontFamily">
              <n-radio v-for="font in fontFamilyList" :key="font" :value="font">
                {{ font }}
              </n-radio>
            </n-radio-group> -->
            <!-- <v-select density="compact" label="Select" :items="fontFamilyList" variant="outlined"
              @update:model-value="font"></v-select> -->
            背景
          </v-menu>
        </v-btn>
        <!-- <v-btn variant="text">阅读偏好</v-btn> -->
      </div>
    </div>
    <div class="reader-content-container">
      <div class="reader-header">
        <div class="reader-header-content">
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
      <div class="reader-content-body" :style="styleConfig" ref="segment">
        <n-popover :show="showPopover" :x="x" :y="y" trigger="manual">
          <span>{{ selectedWord }}</span>
          <n-button quaternary size="small" @click="() => unfamiliarWordsTable.add(selectedWord)">
            添加到生词本
          </n-button>
          <n-button quaternary size="small" @click="audio(selectedWord)">朗读</n-button>
          <n-button quaternary size="small" @click="handleQueryWord(selectedWord)">查询</n-button>
        </n-popover>
        <Segment v-for="segment in contentSegment" :segment="segment" :key="segment"></Segment>
      </div>
    </div>
    <div class="reader-bottom">
      <!-- <n-space justify="center">
        <n-button block @click="handlePreviousArticle">上一篇</n-button>
        <n-button block @click="handleNextArticle">下一篇</n-button>
      </n-space> -->
    </div>
  </div>
</template>

<style scoped>
.reader-container {
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

.reader-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.btn-group {
  display: flex;
}
</style>
