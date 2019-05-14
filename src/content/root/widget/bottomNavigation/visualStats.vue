<template>
  <div id="visual_chart">
    <apexchart type=line height=350 :options="chartOptions" :series="series" />
  </div>
</template>

<script>
export default {
  props: ['records'],
  data () {
    return {};
  },
  methods: {
    empty: function () {}
  },
  mounted: function () {}
};
</script>
