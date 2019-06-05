<template>
    <functional-calendar
      v-model="calendarData"
      ref="Calendar"
      :change-month-function='true'
      :is-modal='true'
      :is-date-range='true'
      @closed="onCalendarClosed">
    </functional-calendar>
</template>

<script>
import { FunctionalCalendar } from 'vue-functional-calendar';
import { DateTime } from 'luxon';

export default {
  components: {
    FunctionalCalendar
  },
  data () {
    return {
      calendarData: {}
    };
  },
  computed: {},
  methods: {
    preMonth () {
      this.$refs.Calendar.PreMonth();
    },
    nextMonth () {
      this.$refs.Calendar.NextMonth();
    },
    preYear () {
      this.$refs.Calendar.PreYear();
    },
    nextYear () {
      this.$refs.Calendar.NextYear();
    },
    onCalendarClosed () {
      console.log(this.calendarData);
      const dateRange = this.calendarData.dateRange || {};
      if (dateRange.start && dateRange.end) {
        this.$emit('dateRangeUpdated', {
          start: DateTime.fromFormat(dateRange.start.date, 'd/M/yyyy'),
          end: DateTime.fromFormat(dateRange.end.date, 'd/M/yyyy')
        });
      }
    }
  },
  created () {}
};
</script>

<style lang="scss" scroped>
#statmybets-root {
  @import "./DateRangePicker/style.scss";

  .vfc-main-container.vfc-modal {
    left: 35px;
    top: 9px;
  }
}

#statmybets-root .vfc-styles-conditional-class {
  display: inline-block;
}

</style>