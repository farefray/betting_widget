<template>
  <div>
    <v-btn fab dark small icon color="green" @click.stop="right = !right">
      <v-icon dark>timeline</v-icon>
    </v-btn>

    <v-navigation-drawer id="inspire" v-model="right" right temporary fixed :width="widgetWidth">
      <v-layout row>
        <v-flex xs12>
          <v-card flat>
            <v-toolbar color="green" light>
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-spacer></v-spacer>
              <actionButtons v-on:snack="snack" v-on:dateRangeUpdated="dateRangeUpdated" v-on:refresh="refresh"/>
            </v-toolbar>
            <v-snackbar
              class="widget-snackbar"
              v-model="snackbar"
              :timeout="12500"
              :top="true"
              :multi-line="true"
            >
              <div v-html="snackText"></div>
              <v-btn
                color="red"
                flat
                @click="snackbar = loading = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-card>
          <bottomNavigation v-on:widthChange="widthChange" v-on:snack="snack" :records="records" v-if="loaded"/>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

import bottomNavigation from './widget/bottomNavigation.vue'
import actionButtons from './widget/actionButtons.vue'
import LocalBetStorage from '@modules/LocalBetStorage';

export default {
  components: {
    bottomNavigation,
    actionButtons
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: true,
    snackbar: false,
    snackText: '',
    records: [],
    loaded: false,
    dateRange: null,
    widgetWidth: 450
  }),
  methods: {
    refresh: function () {
      this.loaded = false;
      LocalBetStorage.get(this.dateRange).then((bets) => {
        this.records = bets;
        this.loaded = true;
      }).catch((error) => {
        this.snack(error.message);
      });
    },
    snack: function (text) {
      this.snackbar = true;
      this.snackText = text || '';
    },
    widthChange: function (width) {
      this.widgetWidth = width;
    },
    dateRangeUpdated: function (dateRange) {
      this.dateRange = dateRange;
    }
  },
  mounted: function () {
    this.dateRange = {
      start: DateTime.local().minus({ days: 7 }),
      end: DateTime.local()
    };

    this.refresh();
  }
}
</script>

<style>
.widget-snackbar .v-snack__content a {
  font-weight: bold;
  font-size: 1.15em;
  display: block;
  color: green;
}
</style>