<template>
  <div>
    <v-btn icon light :loading="loading" :disabled="loading" @click="updateBets">
      <v-icon>cached</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>view_module</v-icon>
    </v-btn>
    {{test}}
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    records: [],
    test: ''
  }),
  methods: {
    updateBets: function () {
      this.loading = true;

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
      )
        .then((response) => {
          return response.json()
        })
        .then((myJson) => {
          console.log(JSON.stringify(myJson))
          this.loading = false;
        })
    }
  }
}
</script>