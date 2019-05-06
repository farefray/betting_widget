<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon light v-on="on" @click="update">
          <v-icon>cached</v-icon>
        </v-btn>
      </template>
      <span>Refresh</span>
    </v-tooltip>
    <v-data-table
      :headers="headers"
      :items="records"
    >
      <template v-slot:items="props">
        <td class="text-xs-left currentStats-date">{{ props.item.createdAt.toDateString() }}</td>
        <td>{{ props.item.outcome }}</td>
        <td class="text-xs-right">{{ props.item.winLoss }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import Record from './currentStats/Record.js';
  import Bin from '../../../../modules/Bin'; // todo solve with modules aliases

  export default {
    data: () => ({
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'createdAt'
        },
        { text: 'Outcome', value: 'outcome', sortable: false },
        { text: 'Net', value: 'winLoss' }
      ],
      records: []
    }),
    mounted () {},
    methods: {
      update: function () {
        new Bin('weeklyBets').get().then((bets) => {
          console.log(bets);
          if (bets && bets.length) {
            let records = [];
            bets.forEach((record) => {
              records.push(new Record(record));
            })

            this.records = records;
            console.log(records);
          } else {
            this.$emit('snack', 'No records stored yet. Please, load records from bets provider.');
          }
        });
      }
    }
  }
</script>

<style>
  /* Hack */
  .currentStats-date {
    width: 110px;
    padding: 16px 0px 0 4px !important;
    display: block;
  }
</style>