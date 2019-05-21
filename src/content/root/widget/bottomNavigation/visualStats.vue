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
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6
      },
      tooltip: {
        custom: ({series, seriesIndex, dataPointIndex, w}) => {
          const RECORD_INDEX = 2;
          const record = w.config.series[seriesIndex].data[dataPointIndex][RECORD_INDEX];
          return recordTooltip(record);
        }
      }
    }
  }),
  mounted() {
    this.$nextTick(() => {
      console.log(this.records);
      if (this.records.length) {
        let data = [
          {
            name: 'TEAM',
            type: 'line',
            data: []
          }
        ];

        let balance = 0;
        let sameTime = 0;
        this.records.forEach(record => {
          balance += record.winLoss;
          let recordTimestamp = record.unixDate;
          // Hack to avoid same timestamps in charts(fix me)
          if (sameTime === recordTimestamp) {
            recordTimestamp += 1;
            sameTime = recordTimestamp;
          }

          data[0].data.push([recordTimestamp, balance, record]);
        });

        // Sorting before displaying
        data[0].data = data[0].data.sort((a, b) => {
          return a[0] - b[0];
        });

        this.series = data;
        this.loaded = true;
      }
    });
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
