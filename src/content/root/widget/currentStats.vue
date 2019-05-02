<template>
  <v-data-table
    :headers="headers"
    :items="records"
  >
    <template v-slot:items="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.price }}</td>
    </template>
  </v-data-table>
</template>

<script>
  import mockedData from './mock.js';
  import Record from './Record.js';
  export default {
    data: () => ({
      headers: [
        {
          text: 'Bets',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Net', value: 'net_change' }
      ],
      records: []
    }),
    mounted () {
      let records = new Set();
      mockedData.forEach((record) => {
        records.add(new Record(record));
      })
      console.log(mockedData[0]);
    }
  }
</script>