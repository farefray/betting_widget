<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="dates"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    style="display:inline-flex"
  >
    <template v-slot:activator="{ on }">
      <v-btn dark v-on="on">
        {{selectedRange}}
      </v-btn>
    </template>
    <v-date-picker v-model="dates" multiple no-title scrollable @input="onInput">
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { DateTime, Interval } from 'luxon';

export default {
  data () {
    return {
      dates: [],
      menu: false
    };
  },
  watch: {
    dates (val) {
      val = val.filter(v => !!v);
      console.log(val);
    }
  },
  computed: {
    selectedRange (date) {
      if (this.dates.length === 2) {
        return this.dates[0] + ' - ' + this.dates[1];
      }

      return 'No range selected';
    }
  },
  methods: {
    cancel () {
      this.menu = false;
      this.dates = [];
    },
    onInput (val) {
      if (this.dates.length === 2) {
        this.$refs.menu.save(this.dates);

        const dateRange = {
          start: DateTime.fromISO(this.dates[0]),
          end: DateTime.fromISO(this.dates[1])
        };

        this.$emit('dateRangeUpdated', dateRange);
      }
    },
    isInSelectedRange (date) {
      return Interval.fromDateTimes(DateTime.fromISO(this.dates[0]), DateTime.fromISO(this.dates[1])).contains(
        DateTime.fromISO(date)
      );
    }
  },
  created () {}
};
</script>

<style lang="scss" scoped>
#statmybets-root .v-date-picker-table .v-btn.v-btn--active {
  color: green;
}
</style>