<template>
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
</template>

<script>
  import mockedData from './currentStats/mock.js';
  import Record from './currentStats/Record.js';

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
    mounted () {
      let records = [];
      mockedData.forEach((record) => {
        records.push(new Record(record));
      })

      this.records = records;
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