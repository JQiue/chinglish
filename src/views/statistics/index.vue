<template>
  <n-statistic :value="vocabularySize">
    <template #label>
      个人词汇量（{{ getLevel() }}）
    </template>
  </n-statistic>
  <n-space>
    <n-popconfirm positiveText="确定" negative-text="取消" @positive-click="handleClear">
      确定删除？
      <template #trigger>
        <n-button>清除所有统计数据</n-button>
      </template>
    </n-popconfirm>
    <n-button @click="handleDelDuplicate">去重</n-button>
    <n-select v-model:value="limit" :options="options" @update:value="handleChange" />
  </n-space>
  <div class="statistics" id="statistics"> </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useWordFreqTable } from '@/db';
import * as echarts from 'echarts';
import wonderland from '../../assets/wonderland.project.json';
import { SelectBaseOption } from 'naive-ui/es/select/src/interface';

const wordfreqTable = useWordFreqTable();

echarts.registerTheme("wonderland", wonderland);
let myChart: echarts.ECharts;

const vocabularySize = ref(0);
const limit = ref(10);
const options = ref<SelectBaseOption[]>([
  {
    label: "10",
    value: 10
  },
  {
    label: "25",
    value: 25
  },
  {
    label: "50",
    value: 50
  }
]);

/** 更改时绘制 */
const handleChange = () => {
  draw();
}

const getVocabularySize = async () => {
  const count = await wordfreqTable.getVocabularySizeStat();
  vocabularySize.value = count;
}

/** 清除数据 */
const handleClear = async () => {
  await wordfreqTable.clear();
  await getVocabularySize();
  await draw();
}

/** 去重 */
const handleDelDuplicate = async () => {
  await wordfreqTable.delDuplicate();
  await getVocabularySize();
  await draw();
}

/** 绘制图表 */
const draw = async () => {
  const data = await wordfreqTable.getWordFreqStat(limit.value);
  const wordData = data.map((value) => value.word);
  const freqData = data.map((value) => value.frequency);
  const option = {
    title: {
      text: '高频单词'
    },
    tooltip: {},
    xAxis: {
      data: wordData
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: freqData
      }
    ]
  }
  myChart.setOption(option);
}

/** 戏称词汇量水平  */
const getLevel = () => {
  const count = vocabularySize.value;
  if (count == 0) {
    return '婴儿般'
  } else if (count < 1000) {
    return '舔奶盖'
  } else if (count < 2000) {
    return '唯唯诺诺'
  } else if (count < 4000) {
    return '小学生'
  } else if (count < 8000) {
    return 'Not a baby'
  } else if (count < 10000) {
    return '不是国人'
  }
}

onMounted(async () => {
  getVocabularySize();
  myChart = echarts.init(document.getElementById('statistics'), 'wonderland');
  window.addEventListener('resize', function () {
    myChart.resize();
  });
  draw();
})
</script>

<style scoped>
.statistics {
  height: 83vh;
}
</style>