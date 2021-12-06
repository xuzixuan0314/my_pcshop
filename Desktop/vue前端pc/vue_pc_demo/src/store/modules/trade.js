// 交易页面
import {reqTradeInfo} from '@/api'
const state={
    tradeInfo:{}
}
const mutations={
    RECEIVETRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    }
}
const actions={
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code===200){
            commit('RECEIVETRADEINFO',result.data)
        }
    }
}
const getters={
    couponInfoList(state){
        return state.tradeInfo.couponInfoList||[]
    },
    detailArrayList(state){
        return state.tradeInfo.detailArrayList||[]
    },
    orderDetailVoList(){
        return state.tradeInfo.orderDetailVoList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}