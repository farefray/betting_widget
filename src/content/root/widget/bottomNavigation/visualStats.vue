<template>
  <div id="visual_chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series" v-if="loaded"/>
    <v-card v-if="loaded" v-html="tooltipPreview" class="betcard-container__full mx-auto"
  color="#26c6da"
  dark
  max-width="400"></v-card>
  </div>
</template>

<script>
import recordTooltip from './visualStats/recordTooltip';

export default {
  props: ['records'],
  components: {
    recordTooltip
  },
  computed: {
    tooltipPreview: function () {
      return recordTooltip(this.records[0]);
    }
  },
  data: () => ({
    loaded: false,
    series: [],
    chartOptions: {
      annotations: {
        yaxis: [{
          y: 0,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Zero point',
            style: {
              color: '#fff',
              background: '#00E396'
            }
          }
        }]
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6
      },
      yaxis: {
        decimalsInFloat: 0
      },
      tooltip: {
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          const RECORD_INDEX = 2;
          const record = w.config.series[seriesIndex].data[dataPointIndex][RECORD_INDEX];
          return recordTooltip(record);
        }
      },
      markers: {
        size: 4,
        opacity: 0.9,
        colors: ['#FFA41B'],
        strokeColor: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7
        },
        discrete: []
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#16ce50'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      }
    }
  }),
  mounted () {
    this.$nextTick(() => {
      console.log(this.records);
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
        this.records.forEach(record => {
          balance += record.winLoss;
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

        // Sorting before displaying
        series[0].data = series[0].data.sort((a, b) => {
          return a[0] - b[0];
        });

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
      &--date, &--status {
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
