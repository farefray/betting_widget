<template>
  <div>
    <v-btn fab dark small icon color="indigo" @click.stop="right = !right">
      <v-icon dark>timeline</v-icon>
    </v-btn>

    <v-navigation-drawer id="inspire" v-model="right" right temporary fixed>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="indigo" light>
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-spacer></v-spacer>
              <actionButtons/>
            </v-toolbar>
            <currentStats />
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
    right: false
  })
}
</script>