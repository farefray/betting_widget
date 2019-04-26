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
  methods: {
    activate: () => {
      fetch(
        'https://api.arcadia.pinnacle.com/0.1/bets?status=settled&startDate=2019-3-26&endDate=2019-4-26',
        {
          credentials: 'omit',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': 'CmX2KcMrXuFmNg6YFbmTxE0y9CIrOi0R',
            'x-device-uuid': 'b98d4393-d272d471-63370a0c-ee0da2f1',
            'x-session': 'U97XtmjPxr6VUNeuu8EwFXoxGtktJl2q'
          },
          referrer: 'https://future.pinnacle.com/en/account/bets/history/',
          referrerPolicy: 'no-referrer-when-downgrade',
          body: null,
          method: 'GET',
          mode: 'cors'
        }
      ).then(function (response) {
        return response.json()
      }).then(function (myJson) {
        console.log(JSON.stringify(myJson))
      })
    }
  }
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
