import {reqSearchList} from '../../api'




const state={
    searchList:{}
}
const mutations={
    GET_SEARCH_LIST(state,obj){
        state.searchList=obj
    }
}
const actions={
    async getSearchList({commit},reqSearchParams){
        const result = await reqSearchList(reqSearchParams)
        if(result.code===200){
            commit('GET_SEARCH_LIST',result.data)
        }
    }
}
const getters={
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}



export default{
    state,
    mutations,
    actions,
    getters
}