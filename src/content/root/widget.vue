<template>
  <div>
  <v-btn fab dark small icon color="indigo" @click.stop="right = !right">
    <v-icon dark>timeline</v-icon>
  </v-btn>

  <v-navigation-drawer id="inspire" v-model="right" right temporary fixed>
    <currentStats/>
  </v-navigation-drawer>
  </div>
</template>

<script>
import currentStats from './widget/currentStats.vue'
export default {
  components: {
    currentStats
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false
  }),
  props: {
    source: String
  }
}
</script>