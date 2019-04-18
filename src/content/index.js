
import Vue from 'vue'
import root from './root.vue'
Vue.config.productionTip = false
var newNode = document.createElement('div')
newNode.id = 'TranslateWindow'
document.body.appendChild(newNode)
/* eslint-disable no-new */
new Vue({
  el: '#TranslateWindow',
  render: h => h(root)
})
