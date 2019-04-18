import Vue from 'vue'
import root from './root.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
(function () {
  Vue.config.productionTip = false
  Vue.use(VueAxios, axios)
  var newNode = document.createElement('div')
  newNode.id = 'TranslateWindow'
  document.body.appendChild(newNode)
  /* eslint-disable no-new */
  new Vue({
    el: '#TranslateWindow',
    render: h => h(root)
  })
})()
