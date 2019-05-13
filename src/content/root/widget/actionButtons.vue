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
    
    <DateRangePicker/>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon light v-on="on" @click="empty">
          <v-icon>cached</v-icon>
        </v-btn>
      </template>
      <span>Refresh</span>
    </v-tooltip>
  </div>
</template>

<script>
import ProviderModel from './actionButtons/ProviderModel.js';
import LocalBetStorage from '@modules/LocalBetStorage';
import DateRangePicker from '@components/DateRangePicker';

export default {
  components: {
    DateRangePicker
  },
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
    empty: function () {

    },
    updateBets: function () {
      if (!this.hasProvider) {
        return this.$emit('snack', 'No provider recognized');
      }

      this.loading = true;
      this.providerModel.requestBets().then((bets) => {
        LocalBetStorage.set(bets);
        this.$emit('snack', `Imported ${bets.length} records!`);
      }).catch((error) => {
        this.$emit('snack', error.message);
      }).finally(() => {
        this.loading = false;
      })
    }
  },
  mounted () {
    this.providerModel = new ProviderModel(window.location.hostname);
  }
}
</script>