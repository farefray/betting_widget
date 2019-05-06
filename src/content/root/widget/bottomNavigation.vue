<template>
  <div>
    <div class="headline text-xs-center pa-1">
      <currentStats v-on:snack="snack" v-if="bottomNav === 'recent'"/>
      <summaryStats v-on:snack="snack" v-if="bottomNav === 'summary'"/>
    </div>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="transparent">
      <v-btn color="lime" flat value="summary">
        <span>Summary</span>
        <v-icon>dashboard</v-icon>
      </v-btn>

      <v-btn color="lime" flat value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="lime" flat value="nearby">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
import currentStats from './bottomNavigation/currentStats.vue'
import summaryStats from './bottomNavigation/summaryStats.vue'
export default {
  components: {
    currentStats,
    summaryStats
  },
  data: () => ({
    bottomNav: 'recent'
  }),
  mounted () {},
  methods: {
    snack: function (text) {
      this.$emit('snack', text);
    }
  }
};
</script>