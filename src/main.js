import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Axios from 'axios'
import VueTimeago from 'vue-timeago'


Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it

})

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
