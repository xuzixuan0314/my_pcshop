import {reqDetailInfo} from '../../api'


const state={
    detailInfo:{

    }
}
const mutations={
    // 这里主要是接收数据 所以一般用receive
    RECEIVE_DETAIL_INFO(state,Info){
        state.detailInfo=Info
    }
}
const actions={
    async getDetailInfo({commit},skuId){
        const result = await reqDetailInfo(skuId)
        if(result.code===200){
            commit('RECEIVE_DETAIL_INFO',result.data)
        }
    }
}
const getters={
    // 通过计算属性简化参数
    // 注意，这些对象或者数组有可能是没有值的，所以要添加一个判断 如果没有值就为{}或者[] 放置报错
    categoryView(state){
        return state.detailInfo.categoryView||{}
    },
    skuInfo(){
        return state.detailInfo.skuInfo||{}
    },
    spuSaleAttrList(){
        return state.detailInfo.spuSaleAttrList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}