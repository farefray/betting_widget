<template>
  <div>
    <v-btn fab dark small icon color="green" @click.stop="right = !right">
      <v-icon dark>timeline</v-icon>
    </v-btn>

    <v-navigation-drawer id="inspire" v-model="right" right temporary fixed>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="green" light>
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-spacer></v-spacer>
              <actionButtons v-on:snack="snack"/>
            </v-toolbar>
            <currentStats v-on:snack="snack"/>
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
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
import currentStats from './widget/currentStats.vue'
import actionButtons from './widget/actionButtons.vue'
export default {
  components: {
    currentStats,
    actionButtons
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    snackbar: false,
    snackText: ''
  }),
  methods: {
    snack: function (text) {
      this.snackbar = true;
      this.snackText = text || "";
    }
  }
}
</script>