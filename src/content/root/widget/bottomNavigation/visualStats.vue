<template>
  <div id="visual_chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series" v-if="loaded"/>
  </div>
</template>

<script>
export default {
  props: ['records'],
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
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          console.log(series);
          console.log(seriesIndex);
          console.log(dataPointIndex);
          return '<div class="arrow_box">' +
            '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
            '</div>'
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

          data[0].data.push([recordTimestamp, balance]);
        });

        // Sorting before displaying
        data[0].data = data[0].data.sort((a, b) => {
          return a[0] - b[0];
        });

        console.log(data[0].data);
        this.series = data;
        this.loaded = true;
      }
    });
  }
};
</script>
