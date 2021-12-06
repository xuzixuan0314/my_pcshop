import {reqRegister} from '@/api'

const state={}
const mutations={}
const actions={
    async getRegister({commit},userInfo){
        const result = await reqRegister(userInfo)
        // 这里验证码有点问题 先改一下
        if(result.code===206){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
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