<template lang="html">
  <div id="widget-root">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <widget/>
  </div>
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
#widget-root {
  position: fixed;
  top: 5px;
  right: 0px;
  width: 40px;
  height: 60px;
  z-index: 100000;
  transition: width 0.4s ease 0s, height 0.2s ease 0s;

  #widget-label {
    position: relative;
    width: 30px;
    height: 40px;
    top: 17px !important;
    display: block;
    box-sizing: content-box;
    border: 1px solid;
    border-color: #000 #ffffff #000 #000;
    //background-image: url(/images/icons/web100.png);
    cursor: pointer;
    border-radius: 4px 0 0 4px;
    background-repeat: repeat-x;
  }
}
</style>
