<template>
  <div>
  <v-btn flat icon color="indigo" @click.stop="right = !right">
    <v-icon>timeline</v-icon>
  </v-btn>

  <v-navigation-drawer id="inspire" v-model="right" right temporary fixed></v-navigation-drawer>
  </div>
</template>

<script>
export default {
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