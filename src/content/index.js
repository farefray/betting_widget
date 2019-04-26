import Vue from 'vue'
import Vuetify from 'vuetify'
import root from './root.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {})

Vue.config.productionTip = false

let div = document.createElement('div')
div.id = 'statmybets_root'
div.style.position = 'absolute'
div.style.height = '550px'
div.style.width = '350px'
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
