<template lang="html">
  <v-app id="statmybets-root">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <widget/>
  </v-app>
</template>

<script>
import widget from './root/widget.vue'
export default {
  components: {
    widget
  },
  data: () => ({}),
  computed: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss">
#statmybets-root {
  position: fixed;
  top: 5px;
  right: 0px;
  z-index: 100000;
  transition: width 0.4s ease 0s, height 0.2s ease 0s;
  background: transparent;

  .application--wrap {
    min-width: 0 !important;
    min-height: 0 !important;
  }
}
</style>
