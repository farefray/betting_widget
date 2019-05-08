<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="records"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      :rows-per-page-items="[15]"
    >
      <template v-slot:items="props">
        <td class="text-xs-left currentStats-date">{{ props.item.shortDate }}</td>
        <td>{{ props.item.outcome }}</td>
        <td class="text-xs-right">{{ props.item.winLoss }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" total-visible="5"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['records'],
    data: () => ({
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Date',
          align: 'left',
          value: 'createdAt'
        },
        { text: 'Outcome', value: 'outcome', sortable: false },
        { text: 'Net', value: 'winLoss' }
      ]
    }),
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    mounted () {},
    methods: {
      empty: function () {}
    }
  }
</script>

<style>
  /* Hack */
  .currentStats-date {
    padding: 0px 0px 0px 3px !important;
    display: block;
    height: auto !important;
  }

  .v-pagination__item--active {
    color: green !important;
  }

  #statmybets-root table.v-table tbody td {
    height: 100%;
  }
</style>