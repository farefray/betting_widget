import Vue from 'vue'
import Vuetify from 'vuetify'
import VueApexCharts from 'vue-apexcharts'
import root from './root.vue'

// Reset CSS
import 'css-reset-and-normalize/css/reset-and-normalize.css'

// Base CSS
import 'material-icons-font/material-icons-font.css'
import 'vuetify/dist/vuetify.min.css'

Vue.component('apexchart', VueApexCharts)

Vue.use(VueApexCharts)
Vue.use(Vuetify, {
  theme: false
})

Vue.config.productionTip = false

let div = document.createElement('div')
div.id = 'statmybets_root'
div.style.position = 'absolute'
div.style.border = '0px'
div.style.top = '0'
div.style.right = '-350px'

window.onload = () => {
  document.body.appendChild(div)
  new Vue({ // eslint-disable-line no-new
    el: '#statmybets_root',
    render: h => h(root)
  })
}
