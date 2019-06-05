<template>
  <div id="visual_chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series" v-if="loaded" v-on:dataPointSelection="dataPointSelection"/>
    <v-card
      v-if="loaded"
      v-html="tooltipPreview"
      class="betcard-container__full mx-auto"
      color="#26c6da"
      dark
      max-width="400"
    ></v-card>
  </div>
</template>

<script>
import recordTooltip from './visualStats/recordTooltip';
import chartConfig from './visualStats/chartConfig';

export default {
  props: ['records'],
  components: {
    recordTooltip
  },
  computed: {
    tooltipPreview: function () {
      return this.previewRecord && recordTooltip(this.previewRecord);
    }
  },
  data: () => ({
    loaded: false,
    series: [],
    previewRecord: null,
    chartOptions: chartConfig
  }),
  mounted () {
    this.$nextTick(() => {
      if (this.records.length) {
        const series = [
          {
            type: 'line',
            data: []
          }
        ];

        let balance = 0;
        let sameTime = 0;
        const recordsAverages = {
          stack: {
            min: 0,
            max: 0,
            avg: 0,
            total: 0
          }
        }

        console.log('b:' + balance);
        this.records.forEach(record => {
          balance += record.winLoss;
          console.log('w:' + record.winLoss);
          console.log('b:' + balance);
          let recordTimestamp = record.unixDate;
          // Hack to avoid same timestamps in charts(fix me)
          if (sameTime === recordTimestamp) {
            recordTimestamp += 1;
            sameTime = recordTimestamp;
          }

          if (recordsAverages.stack.min > record.stake) {
            recordsAverages.stack.min = record.stake;
          }

          if (recordsAverages.stack.max < record.stake) {
            recordsAverages.stack.max = record.stake;
          }

          recordsAverages.stack.avg += record.stake;
          recordsAverages.stack.total += 1;

          series[0].data.push([recordTimestamp, balance, record]);
        });

        recordsAverages.stack.avg = recordsAverages.stack.avg / recordsAverages.stack.total;

        const discrete = [];
        let dataPointIndex = 0;
        series[0].data.forEach(element => {
          const record = element[2];
          discrete.push({
            seriesIndex: 0,
            dataPointIndex: dataPointIndex,
            fillColor: record.winLoss > 0 ? '#16ce50' : '#ba0707',
            strokeColor: '#eee',
            size: this.getMarkerSize(record, recordsAverages.stack)
          });

          dataPointIndex += 1;
        });

        this.series = series;
        this.chartOptions.markers.discrete = discrete;
        this.loaded = true;
      }
    });
  },
  methods: {
    getMarkerSize (record, stats) {
      return 10 / 100 * (record.stake / ((stats.min + stats.max) / 100));
    },
    dataPointSelection (event, chartContext, config) {
      this.previewRecord = this.records[config.dataPointIndex];
    }
  }
};
</script>

<style lang="scss">
#statmybets-root .betcard-body {
  transition: all 0.2s linear;
  background-color: rgba(255, 255, 255, 0.03);
  color: black;
  text-decoration: none;
  margin-right: 1px;
  display: flex;
  flex-direction: column;
  &__header {
    justify-self: center;
  }
  &__top {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    &--date,
    &--status {
      font-size: 0.75em;
      margin: 0px 3%;
    }
  }
  &__participant--record {
    display: flex;
    justify-content: space-evenly;
  }
  &__bottom {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    font-size: 0.65em;
    div {
      margin: 0 2%;
    }
  }
}
</style>
