import Vue from 'vue'
import root from './root.vue'
Vue.config.productionTip = false

let div = document.createElement('div')
div.id = 'root'
div.style.position = 'absolute'
div.style.height = '550px'
div.style.width = '350px'
div.style.border = '0px'
div.style.top = '0'
div.style.right = '-350px'

window.onload = () => {
  document.body.appendChild(div)
  new Vue({ // eslint-disable-line no-new
    el: '#root',
    render: h => h(root)
  })
}
