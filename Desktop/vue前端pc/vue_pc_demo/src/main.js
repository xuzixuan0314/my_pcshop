import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Pagination from './components/Pagination'
import store from './store'
import './plugins/swiper'
import './mock/mockServer'

Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
