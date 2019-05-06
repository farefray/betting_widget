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
import Bin from '../../../../modules/Bin'; // todo solve with modules aliases
export default {
  data () {
    return {
      items: []
    };
  },
  mounted: function () {
    new Bin('weeklyBets').get().then((bets) => {
      let summary = [];
      summary.push({
        header: 'Summary'
      });

      summary.push({
        title: 'Total bets stored:',
        subtitle: (bets && bets.length) || 0
      });

      summary.push({
        title: 'Bets period:',
        subtitle: '1 week(todo)'
      });

      summary.push({
        title: 'Period net change:',
        subtitle: '+100$(todo)'
      });

      this.items = summary;
    });
  }
};
</script>