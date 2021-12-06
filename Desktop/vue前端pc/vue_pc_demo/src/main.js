import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Pagination from './components/Pagination'
// import AddCartSuccess from './components/AddCartSuccess'
import store from './store'
import * as API from './api' 
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.png'
import '@/plugins/element'
import './plugins/swiper'
import './mock/mockServer'
import './api'
import './plugins/validata'
Vue.use(VueLazyload,{
  loading
})
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
// Vue.component(AddCartSuccess.name,AddCartSuccess)
new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
