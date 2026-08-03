<template>
  <Banner selected-nav="113001" title="Stock Quote & Chart" />
  <div class="container">
    <NavText />
    <div class="stock-quote-chart">
      <!-- Stock data widget -->
      <div class="widget-data">
        <div class="client_class">
          <div class="wd_widget" data-wd_widget-id=" " data-wd_widget-host="//example.test">
            <van-icon name="comment" style="color: red; font-size: 18px;" />
          </div>
          <!-- <h3>Stock price information is currently unavailable.</h3> -->

        </div>
      </div>
      <!-- k线图 -->
      <div class="stock-chart">
        <h3>Stock Chart</h3>
        <div style="margin-top: 20px">
          <div>US</div>
          <button class="chart-btn" @click="getData('day', 5)">5 Days</button>
          <button class="chart-btn" @click="getData('day')">Day K</button>
          <button class="chart-btn" @click="getData('week')">Week K</button>
          <button class="chart-btn" @click="getData('month')">Month K</button>
          <button class="chart-btn" @click="getData('year')">Year K</button>
        </div>
        <div id="main" style="width: 100%;height:400px;"></div>
        <div class="stock-footer">Minimum 15 minutes delayed. Source: Market Data</div>

      </div>

    </div>
  </div>

</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import Banner from '@/components/Banner.vue'
import NavText from '@/components/NavText.vue'
import { fqkline } from '@/api/user'

interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume?: string;
}

interface CandlestickData {
  value: [number, number, number, number];
}
// const chartDom = ref<HTMLDivElement | null>(null);
const chartDom = ref<HTMLElement | null>(null); // 修改类型声明
const myChart = ref<echarts.ECharts | null>(null);
const rawData = ref<StockData[]>([]);

const getData = async (type: string, num?: number) => {
  try {
    const response = await fqkline(type);
    if (!response.data?.data?.['usDEMO.OQ']) {
      return;
    }

    const resdata = response.data.data['usDEMO.OQ'][type];
    let cleanData: StockData[] = [];

    if (Array.isArray(resdata)) {
      cleanData = convertToTwoArray(resdata);
    } else if (typeof resdata === 'object') {
      cleanData = Object.values(resdata)
        .filter(item => Array.isArray(item) || typeof item === 'object')
        .flatMap(item => convertToTwoArray([item]))
        .filter(item =>
          item.date &&
          typeof item.open === 'string' &&
          typeof item.high === 'string' &&
          typeof item.low === 'string' &&
          typeof item.close === 'string'
        );
    }

    // 过滤掉包含非数字close值的项
    cleanData = cleanData.filter(item => {
      const close = parseFloat(item.close);
      return !isNaN(close);
    });

    rawData.value = num
      ? filterData(cleanData, num)
      : cleanData;

    updateChart();

  } catch (error) {
    // Error handling
  }
};
const convertToTwoArray = (dataArray: any[]): StockData[] => {
  if (!Array.isArray(dataArray)) return [];
  return dataArray.map((item) => {
    // 跳过包含非预期数据的项
    if (Array.isArray(item) && item.length >= 5 && typeof item[4] === 'string') {
      return {
        date: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4]
      };
    }
    if (typeof item === 'object' && item !== null) {
      // 提取有效字段（根据接口实际数据结构调整）
      const date = item.cqr || Object.values(item)[0]; // 优先使用标准日期字段
      return {
        date,
        open: item[1] || item.open,       // 处理字段名不一致的情况
        high: item[2] || item.high,
        low: item[3] || item.low,
        close: item[4] || item.close
      };
    }
    // 处理混合数据类型（数组和对象）
    if (Array.isArray(item)) {
      // 处理正常数组格式
      return {
        date: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4]
      };
    }
    return {} as StockData;
  })
    .filter(item =>
      item.date &&
      typeof item.open === 'string' &&
      typeof item.high === 'string' &&
      typeof item.low === 'string' &&
      typeof item.close === 'string'
    )
    .filter(item =>
      !isNaN(item.open) &&
      !isNaN(item.high) &&
      !isNaN(item.low) &&
      !isNaN(item.close)
    );
};

const filterData = (data: StockData[], num: number): StockData[] => {
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  return sortedData.slice(-num);
};

const calculateMA = (dayCount: number, data: number[][]) => {
  if (data.length < dayCount) return Array(data.length).fill(null);

  return data.map((_item, index) => {
    if (index < dayCount - 1) return null;

    const slice = data.slice(index - dayCount + 1, index + 1);
    const sum = slice.reduce((acc, [, , , close]) => acc + (close || 0), 0);
    return Number((sum / dayCount).toFixed(2));
  });
};

const updateChart = () => {
  if (!chartDom.value || !rawData.value?.length) return;
  try {
    // 增强数据清洗
    const validData = rawData.value
      .filter(item =>
        item.date &&
        typeof item.open === 'string' &&
        typeof item.high === 'string' &&
        typeof item.low === 'string' &&
        typeof item.close === 'string'
      )
      .map(item => ({
        date: item.date,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close)
      }))
      .filter(item =>
        !isNaN(item.open) &&
        !isNaN(item.high) &&
        !isNaN(item.low) &&
        !isNaN(item.close)
      )
      .filter(Boolean); // 额外过滤空对象
    if (validData.length === 0) {
      // 显示空数据提示
      myChart.value?.setOption({
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '暂无有效数据',
            fontSize: 16
          }
        },
        series: [] // 清空所有系列数据
      });
      return;
    }

    const dates = validData.map(item => item.date);
    const data = validData.map(item => [
      item.open,
      item.high,
      item.low,
      item.close
    ]);

    // 计算 MA 数据
    const ma5 = calculateMA(5, data);
    const ma10 = calculateMA(10, data);
    const ma20 = calculateMA(20, data);
    const ma30 = calculateMA(30, data);

    // 确保 MA 数据与主数据长度一致
    const maxLength = Math.max(data.length, ma5.length, ma10.length, ma20.length, ma30.length);
    const paddedMa5 = [...ma5, ...Array(maxLength - ma5.length).fill(null)];
    const paddedMa10 = [...ma10, ...Array(maxLength - ma10.length).fill(null)];
    const paddedMa20 = [...ma20, ...Array(maxLength - ma20.length).fill(null)];
    const paddedMa30 = [...ma30, ...Array(maxLength - ma30.length).fill(null)];

    const option: echarts.EChartsOption = {
      responsive: true,
      legend: {
        data: ['MA5', 'MA10', 'MA20', 'MA30'],
        inactiveColor: '#777',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1,
          },
        },
        formatter: (params: any) => {
          const param = params[0];
          return `
              date: ${param.name}<br/>
              open: ${param.data[1]}<br/>
              close: ${param.data[2]}<br/>
              lowest: ${param.data[3]}<br/>
              highest: ${param.data[4]}
            `;
        },
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          formatter: (value: string) => {
            const date = new Date(value);
            // 检查日期是否有效
            if (isNaN(date.getTime())) return value; // 直接返回原始字符串
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          }
        }
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false },
      },
      grid: {
        bottom: 80,
      },
      dataZoom: [
        {
          textStyle: {
            color: '#8392A5',
          },
          handleIcon:
            'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          dataBackground: {
            areaStyle: {
              color: '#8392A5',
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5',
            },
          },
          brushSelect: true,
        },
        {
          type: 'inside',
        },
      ],
      series: [
        {
          type: 'candlestick',
          data: data.map(item => {
            const [open, high, low, close] = item;
            if ([open, high, low, close].some(isNaN)) return null;
            return [open, high, low, close];
          }).filter(Boolean) as unknown as CandlestickData[],
        },
        {
          name: 'MA5',
          type: 'line',
          data: paddedMa5,
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1 },
          connectNulls: true // 跳过 null 值
        },
        {
          name: 'MA10',
          type: 'line',
          data: paddedMa10,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'MA20',
          type: 'line',
          data: paddedMa20,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
        {
          name: 'MA30',
          type: 'line',
          data: paddedMa30,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1,
          },
        },
      ],
    };
    // 检查 option 是否有效
    if (!myChart.value) {
      myChart.value = echarts.init(chartDom.value!);
    }
    myChart.value?.setOption(option);
  } catch (error) {
    // Error handling
  }
}

getData('day');
onMounted(async () => {
  chartDom.value = document.getElementById('main');
  await getData('day'); // 等待数据加载完成
});
</script>
<style lang='scss' scoped>
.vant-icon {
  display: block;
  margin: 0 auto;
  width: 15%;
}

.stock-quote-chart {
  margin: 40px 0 50px 0;
}
</style>