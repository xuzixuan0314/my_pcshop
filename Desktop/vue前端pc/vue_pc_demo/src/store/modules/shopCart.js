import {reqShopCartInfo,UpdateCheckOne,deleteOne} from '../../api'

const state = {
    cartInfoList:[]
}
const mutations ={
    RECEIVE_SHOPCART_Info(state,shopCartInfo){
        state.cartInfoList=shopCartInfo
        console.log('####',shopCartInfo)
    }
}
const actions = {
    async getShopCartInfo({commit}){
        const result = await reqShopCartInfo()
        if(result.code===200){
            commit('RECEIVE_SHOPCART_Info',result.data)
        }
    },
    async checkOne({commit},{skuId,isChecked}){
        const result = await UpdateCheckOne(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new error)
        }
    },
    async checkAll({commit,state,dispatch},isChecked){
        let promises=[]
        // 遍历所有商品,将 与当前点击时的选中状态不一致的 发送请求修改选中状态
        state.cartInfoList[0].cartInfoList.forEach((item)=>{
            if(item.isChecked===isChecked) return
            let promise = dispatch('checkOne',{skuId:item.skuId,isChecked})
            promises.push(promise)
        })
        return Promise.all(promises)
    },
    async deleteOne({commit},skuId){
        const result = await deleteOne(skuId)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    deleteAll({commit,state,dispatch}){
        let promises=[]
        state.cartInfoList[0].cartInfoList.forEach((item)=>{
            if(!item.isChecked) return
            let promise = dispatch('deleteOne',item.skuId)
            promises.push(promise)
        })
        return Promise.all(promises)
    }
}
const getters={
    cartInfo(state){
        return state.cartInfoList[0]||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}