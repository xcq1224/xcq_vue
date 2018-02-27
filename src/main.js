import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = {isFooter: 'shouye'}

var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
console.log(app)
