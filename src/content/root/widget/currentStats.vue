<template>
  <v-data-table
    :headers="headers"
    :items="records"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.net_change }}</td>
    </template>
  </v-data-table>
</template>

<script>
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
      records: [
        {
          name: 'Test',
          net_change: 159
        },
        {
          name: 'Test2',
          net_change: -12
        }
      ]
    })
  }
</script>