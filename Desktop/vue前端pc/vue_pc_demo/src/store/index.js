// import Vue from 'vue'
// import Vuex from 'vuex'
// import home from './modules/home'
// import user from './modules/user'
// Vue.use(Vuex)

// export default new Vuex.Store({
//     mutations:{},
//     actions:{},
//     getters:{},
//     modules:{
//         home,
//         user
//     }
// })


import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
Vue.use(Vuex)

const mutations={}
const actions = {}
const getters ={}

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules:{
        home,
        user,
        search
    }
})