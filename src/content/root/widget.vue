<template>
  <div>
    <v-btn fab dark small icon color="green" @click.stop="right = !right">
      <v-icon dark>timeline</v-icon>
    </v-btn>

    <v-navigation-drawer id="inspire" v-model="right" right temporary fixed width="450px">
      <v-layout row>
        <v-flex xs12>
          <v-card flat>
            <v-toolbar color="green" light>
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-spacer></v-spacer>
              <actionButtons v-on:snack="snack" v-on:dateRangeUpdated="dateRangeUpdated" v-on:refresh="refresh"/>
            </v-toolbar>
            <v-snackbar
              v-model="snackbar"
              :timeout="7500"
              :top="true"
              :multi-line="true"
            >
              {{ snackText }}
              <v-btn
                color="red"
                flat
                @click="snackbar = loading = false"
              >
                Close
              </v-btn>
            </v-snackbar>
          </v-card>
          <bottomNavigation v-on:snack="snack" :records="records" v-if="loaded"/>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
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
    dateRange: null
  }),
  methods: {
    refresh: function () {
      this.loaded = false;
      LocalBetStorage.get(this.dateRange).then((bets) => {
        this.records = bets;
        this.loaded = true;
      });
    },
    snack: function (text) {
      this.snackbar = true;
      this.snackText = text || '';
    },
    dateRangeUpdated: function (dateRange) {
      this.dateRange = dateRange;
    }
  },
  mounted: function () {
    this.refresh();
  }
}
</script>
