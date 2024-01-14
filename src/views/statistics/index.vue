<template>
  <n-select v-model:value="limit" :options="options" @update:value="handleChange" />
  <n-button @click="handleClear">清除所有统计数据</n-button>
  <div class="statistics" id="statistics"> </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { wordfreqTable } from '@/db/services';
import wonderland from '../../assets/wonderland.project.json';
import { SelectBaseOption } from 'naive-ui/es/select/src/interface';

echarts.registerTheme("wonderland", wonderland);
let myChart: echarts.ECharts;

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

const handleChange = () => {
  draw();
}

const handleClear = () => {
  wordfreqTable.clear();
  draw()
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

onMounted(async () => {
  myChart = echarts.init(document.getElementById('statistics'), 'wonderland');
  window.addEventListener('resize', function () {
    myChart.resize();
  });
  draw()
})
</script>

<style scoped>
.statistics {
  height: 80vh;
}
</style>