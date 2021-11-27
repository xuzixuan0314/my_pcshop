import {reqCategoryList} from '../../api' 
const state={
    categoryList:[]
}
const mutations={
    GET_CATEGROY_LIST(state,reqCategrouArr){
        state.categoryList=reqCategrouArr.splice(0,15)
    }
}
const actions={
    // 获取三级分类列表的异步aciton
    async getCategroyList({commit}){
        // 发送ajax请求(调用请求接口函数)
    const result = await reqCategoryList()
        // 如果请求成功了，将得到数据提交给mutation
        if(result.code===200){
            const reqCategrouArr = result.data
            commit('GET_CATEGROY_LIST',reqCategrouArr)
        }
    }
}
const getters={}


export default{
    state,
    mutations,
    actions,
    getters
}