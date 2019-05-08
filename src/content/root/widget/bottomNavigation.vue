<template>
  <div>
    <div class="headline text-xs-center pa-1">
      <currentStats v-on:snack="snack" :records="records" v-if="bottomNav === 'recent'"/>
      <summaryStats v-on:snack="snack" :records="records" v-if="bottomNav === 'summary'"/>
      <visualStats v-on:snack="snack" :records="records" v-if="bottomNav === 'visual'"/>
    </div>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="transparent" id="bottomNav">
      <v-btn color="green" flat value="summary">
        <span>Summary</span>
        <v-icon>dashboard</v-icon>
      </v-btn>

      <v-btn color="green" flat value="recent">
        <span>Recent records</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="green" flat value="visual">
        <span>Visual Stats</span>
        <v-icon>timeline</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import currentStats from './bottomNavigation/currentStats.vue'
import summaryStats from './bottomNavigation/summaryStats.vue'
import visualStats from './bottomNavigation/visualStats.vue';

export default {
  components: {
    currentStats,
    summaryStats,
    visualStats
  },
  props: ['records'],
  data: () => ({
    bottomNav: 'summary'
  }),
  mounted () {},
  methods: {
    snack: function (text) {
      this.$emit('snack', text);
    }
  }
};
</script>

<style>
#statmybets-root .v-item-group.v-bottom-nav .v-btn, #bottomNav {
  height: auto !important;
}
</style>