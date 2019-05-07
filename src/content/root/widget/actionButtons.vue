<template>
  <div>
    <v-tooltip bottom v-if="hasProvider">
      <template v-slot:activator="{ on }">
        <v-btn icon light :loading="loading" v-on="on" :disabled="loading" @click="updateBets">
          <v-icon>cached</v-icon>
        </v-btn>
      </template>
      <span>Update bets from current provider</span>
    </v-tooltip>
    
    <v-btn icon>
      <v-icon>view_module</v-icon>
    </v-btn>
  </div>
</template>

<script>
import ProviderModel from './actionButtons/ProviderModel.js';
import Bin from '@modules/Bin';

export default {
  data: () => ({
    providerModel: null,
    loading: false
  }),
  computed: {
    hasProvider: function () {
      return this.providerModel && this.providerModel.hasProvider();
    }
  },
  methods: {
    updateBets: function () {
      if (!this.hasProvider) {
        return this.$emit('snack', 'No provider recognized');
      }

      this.loading = true;
      this.providerModel.provider.request().then((bets) => {
        const betsBin = new Bin('weeklyBets');
        betsBin.set(bets);
      }).catch((error) => {
        this.$emit('snack', error.message);
      }).finally((bets) => {
        this.loading = false;
      })
    }
  },
  mounted () {
    this.providerModel = new ProviderModel(window.location.hostname);
  }
}
</script>