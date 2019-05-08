<template>
  <v-list two-line>
    <template v-for="(item, index) in items">
      <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
      <v-list-tile v-else :key="item.title">
        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="index" :inset="item.inset"></v-divider>
    </template>
  </v-list>
</template>

<script>
import { Interval } from 'luxon';

export default {
  props: ['records'],
  data () {
    return {
      items: []
    };
  },
  methods: {
    getPeriod: function (records) {
      const start = records[0].date;
      const end = records[records.length - 1].date;
      const days = Math.ceil(Interval.fromDateTimes(start, end).length('days'))
      return days + ` day${days > 1 ? 's' : ''}`;
    },
    getNetChange: function (records) {
      return (records.reduce((netChange, currentRecord) => {
        return (netChange.winLoss || netChange) + currentRecord.winLoss;
      })).toFixed(2) + '$';
    }
  },
  mounted: function () {
    const bets = this.records;

    let summary = [];
    summary.push({
      header: 'Summary'
    });

    summary.push({
      title: 'Total bets stored:',
      subtitle: bets.length || 0
    });

    console.log(bets);
    if (!bets.length) {
      return;
    }

    summary.push({
      title: 'Recorder period:',
      subtitle: this.getPeriod(bets)
    });

    summary.push({
      title: 'Net change:',
      subtitle: this.getNetChange(bets)
    });

    this.items = summary;
  }
};
</script>

<style>
#statmybets-root .v-subheader {
  font-weight: bold;
}
</style>