<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon light :loading="loading" v-on="on" :disabled="loading" @click="updateBets">
          <v-icon>cached</v-icon>
        </v-btn>
      </template>
      <span>Update bets from provider</span>
    </v-tooltip>
    
    <v-btn icon>
      <v-icon>view_module</v-icon>
    </v-btn>

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
      <v-btn
        color="green"
        flat
        @click="goToPinnacle()"
      >
        Auth
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
const NO_AUTH_CODE = 401;
export default {
  data: () => ({
    loading: false,
    snackbar: false,
    snackText: '',
    records: []
  }),
  methods: {
    goToPinnacle: function () {
      this.snackbar = false;
      window.open('https://future.pinnacle.com/en/account/bets', '_blank');
    },
    updateBets: function () {
      this.loading = true;

      // Grab tokens from local storage to use with our requests
      let pinnacleUserAuth = localStorage['Main:User'];
      if (!pinnacleUserAuth) {
        this.snackbar = true;
        this.snackText = 'Session is invalid or has expired';
        return;
      };

      pinnacleUserAuth = JSON.parse(pinnacleUserAuth);
      fetch(
        'https://api.arcadia.pinnacle.com/0.1/bets?status=settled&startDate=2019-3-26&endDate=2019-4-26',
        {
          credentials: 'omit',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-api-key': 'CmX2KcMrXuFmNg6YFbmTxE0y9CIrOi0R', // TODO get from somewhere
            'x-device-uuid': pinnacleUserAuth.uuid,
            'x-session': pinnacleUserAuth.token
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
        .then((responseJSON) => {
          this.loading = false;
          if (responseJSON.status === NO_AUTH_CODE) {
            this.snackbar = true;
            this.snackText = responseJSON.detail;
            return;
          }

          console.log(JSON.stringify(responseJSON))
          // TODO store somewhere
        })
    }
  }
}
</script>