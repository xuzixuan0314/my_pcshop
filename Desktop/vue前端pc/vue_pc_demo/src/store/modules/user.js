import {getUserTempId,setToken,getToken,removeToken} from '../../utils/userAbout'
import {reqLogin,reqUserInfo,reqLogOut} from '@/api'
const state={
    // 给每一个用户都设置一个唯一的临时标识
    userTempId:getUserTempId(),
    token:getToken(),
    userInfo:{}
}
const mutations={
    RECEIVETOKEN(state,token){
        state.token=token
    },
    RECEIVEUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    // 重置userInfo token 和数据库中的token信息
    RESETTOKEN(state){
        state.token=''
        state.userInfo={}
    },
}

const actions ={
    async getLogin({commit},userInfo){
        const result = await reqLogin(userInfo)
        if(result.code===200){
            const token = result.data.token
            commit('RECEIVETOKEN',token)
            // 登录后主要是想要获取到这个用户的token信息，现在基本上都是自动登录的，所以将token存储在localStorage中
            // 使用工具包存储
            setToken(token)
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    async getUserInfo({commit,dispatch}){
        const result = await reqUserInfo()
        if(result.code===200){
            commit('RECEIVEUSERINFO',result.data)
            return 'ok'
        }else{
            // 如果检测用户处于不是登录的状态，就清空token和userInfo信息
            dispatch('RESETTOKEN')
            removeToken()
            return Promise.reject(new Error('failed'))
        }
    },
    // 退出登录
    async logOut({commit}){
        const result = await reqLogOut()
        if(result.code===200){
            commit('RESETTOKEN')
            removeToken()
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }




}

const getters={
}
export default {
    state,
    mutations,
    actions,
    getters
}