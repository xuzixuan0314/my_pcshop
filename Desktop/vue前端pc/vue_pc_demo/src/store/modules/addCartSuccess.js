import {reqAddCartSuccess} from '../../api'

const state={}
const mutations={

}
const actions = {
    async getAddCartSuccess({commit},{skuId,goodsNum}){
        const result = await reqAddCartSuccess(skuId,goodsNum)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject('failed')
        }
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}