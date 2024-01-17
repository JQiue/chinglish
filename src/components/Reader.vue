<template>
  <div class="reader-container" :style="{ backgroundColor: styleConfig.backgroundColor }" ref="reader">
    <div class="reader-top">
      <div></div>
      <div></div>
      <div class="btn-group">
        <n-button quaternary circle @click="handleRead(props.content ?? '')">
          <template #icon>
            <VoiceIcon></VoiceIcon>
          </template>
        </n-button>
        <n-button quaternary circle @click="handleShowSettingsDrawerClick">
          <template #icon>
            <SettingsIcon></SettingsIcon>
          </template>
        </n-button>
      </div>
    </div>

    <div class="reader-content-container">
      <div class="reader-header">
        <div class="reader-header-content">
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
      <div class="reader-content-body" :style="getStyleConfig()" ref="segment">
        <n-popover :show="showPopover" :x="x" :y="y" trigger="manual">
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
      <n-space>
        <span>{{ formatReadTime(readTime) }}</span>
        <span v-show="selectedWord.length != 0">已选择 {{ selectedWord }}</span>
      </n-space>
    </div>
  </div>

  <n-drawer v-model:show="showSettingsDrawer" :width="302" placement="right">
    <n-drawer-content title="设置">
      <div>
        <span>速度</span>
        <n-slider disabled />
      </div>
      <div>
        <span>语音</span>
        <n-select density="compact" label="Select" :options="voiceNames" variant="outlined"></n-select>
      </div>
      <div>
        <span>文字大小</span>
        <n-slider v-model:value="styleConfig.fontSize" :min="1" :max="1.8" :step="0.2" :marks="{
          1: '小',
          1.4: '中',
          1.8: '大',
        }" />
      </div>
      <div>
        <span>文字间距</span>
        <n-slider v-model:value="styleConfig.lineHeight" :min="0.8" :max="1.6" :step="0.2"></n-slider>
      </div>
      <div>
        <span>字体</span>
        <n-radio-group v-model:value="styleConfig.fontFamily" name="radiogroup">
          <n-space>
            <n-radio v-for="font in fontFamilyList" :key="font.value" :value="font.value">
              {{ font.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </div>
      <div>
        <p>背景</p>
        <n-space>
          <n-button v-for="color in backgroundColorList" :key="color.value" @click="handleChangeBgColor(color.value)"
            ghost>{{ color.label
            }}</n-button>
        </n-space>
      </div>
    </n-drawer-content>
  </n-drawer>

  <n-drawer v-model:show="showDrawer" :width="302" placement="right">
    <n-drawer-content title="查询">
      <n-input @input="handleInput"></n-input>
      <n-list hoverable>
        <n-list-item v-for="word in queryWords">
          <n-thing>
            <div style="font-weight: 600;">{{ word.word }}</div>
            <div>音标：{{ word.phonetic }}</div>
            <div>释义：{{ word.translation }}</div>
            <div>释义（英）：{{ word.definition }}</div>
          </n-thing>
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive } from 'vue';
import { getReaderStyleConfig, setReaderStyleConfig } from '../localdata/index';
import { unfamiliarWordsTable } from '../db/services';
import { audio } from '@/helpers/audio';
import { toNumber } from '@/helpers';
import { dictTable } from '@/db/dict';
import Segment from '../components/Segment.vue';
import SettingsIcon from '../components/icons/SettingsIcon.vue';
import VoiceIcon from '../components/icons/VoiceIcon.vue';
import { count as countWord } from 'letter-count';

const props = defineProps<{ title?: string, content?: string }>();

/** 阅读器元素引用  */
const reader = ref<HTMLDivElement>();
/** 段落元素引用 */
const segment = ref<HTMLParagraphElement>();
/** 标题 */
const title = ref<string | undefined>('沉浸式阅读');
/** 内容段落 */
const contentSegment = ref<string[]>([]);
/** 语音列表 */
const voices = ref<Record<string, any>>([]);
/** 阅读器样式 */
const styleConfig = reactive({
  fontSize: 1,
  lineHeight: 1,
  fontFamily: '',
  backgroundColor: ''
});
/** 可用的 font-family */
const font = ref<'' | 'Helvetica' | 'Roboto'>('');
const fontFamilyList = ref([
  { value: '', label: 'Default' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Roboto', label: 'Roboto' },
]);
const backgroundColorList = ref([
  { value: '#ffffff', label: '白雪' },
  { value: '#ffffed', label: '明黄' },
  { value: '#fcefff', label: '红粉' },
  { value: '#c0d3d7', label: '仿墨水屏' },
  { value: '#f5f5dc', label: '米黄' },
]);
/** 选中的单词 */
const selectedWord = ref('');
const x = ref(0);
const y = ref(0);
const showPopover = ref(false);
const showDrawer = ref(false);
const showSettingsDrawer = ref(false);
/** 查询单词结果 */
const queryWords = ref<Dict[]>([]);
/** 阅读时间 */
const readTime = ref(0);

const getStyleConfig = () => {
  const style = {
    fontSize: styleConfig.fontSize + 'rem',
    lineHeight: styleConfig.lineHeight,
    fontFamily: styleConfig.fontFamily,
    backgroundColor: styleConfig.backgroundColor
  }
  return style;
}

const handleChangeBgColor = (color: string) => {
  styleConfig.backgroundColor = color;
}

const getContentReadTime = () => {
  if (props.content) {
    const num = countWord(props.content).words;
    if (num < 150) {
      readTime.value = 0
    } else {
      readTime.value = Math.round(toNumber(num / 150))
    }
  }
}

const formatReadTime = (readTime: number) => {
  if (readTime == 0) {
    return '小于 1 分钟'
  } else {
    return '大约 ' + readTime + ' 分钟'
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

const handleShowSettingsDrawerClick = () => {
  showSettingsDrawer.value = true;
}

/** 处理查询单词 */
const handleQueryWord = async (word: string) => {
  if (dictTable) {
    const data = await dictTable.getLikeWord(word);
    queryWords.value = data;
    showDrawer.value = true;
  }
}

/** 处理单词输入 */
const handleInput = async (word: string) => {
  queryWords.value.length = 0;
  if (dictTable) {
    const list = await dictTable.getLikeWord(word)
    queryWords.value = list;
  }
}

watch(props, () => {
  title.value = props.title;
  toSegment(props.content);
  getContentReadTime();
})

watch(styleConfig, ({ fontFamily }) => {
  styleConfig.fontFamily = fontFamily;
  setReaderStyleConfig(styleConfig);
})

watch(showPopover, (value) => {
  if (!value) selectedWord.value = '';
})

onMounted(() => {
  styleConfig.fontSize = getReaderStyleConfig()?.fontSize || 1;
  styleConfig.lineHeight = getReaderStyleConfig()?.lineHeight || 1;
  styleConfig.fontFamily = getReaderStyleConfig()?.fontFamily || '';
  styleConfig.backgroundColor = getReaderStyleConfig()?.backgroundColor || '';
  font.value = getReaderStyleConfig()?.fontFamily || 'Default';

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

<style scoped>
.reader-container {
  line-height: 160%;
  background-color: #F9F5E9;
  min-height: 100vh;
}

.reader-content-container {
  max-width: 45rem;
  padding-top: 1.173rem !important;
  padding-left: 2.222rem;
  padding-right: 2.222rem;
  padding-bottom: 2.222rem;
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
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-left: 1rem;
  font-size: 0.75rem;
}

.btn-group {
  position: fixed;
  right: 0;
  display: flex;
}

.setting-title {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
</style>
