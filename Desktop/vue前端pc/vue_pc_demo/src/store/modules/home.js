import {reqCategoryList,
        reqBannerList,
        reqFloorList,
        reqRecommendList
    } from '../../api' 
const state={
    categoryList:[],
    bannerList:[],
    recommendList:[],
    floorList:[]
}
const mutations={
    GET_CATEGROY_LIST(state,reqCategrouArr){
        state.categoryList=reqCategrouArr.splice(0,15)
    },
    GET_BANNER_LIST(state,reqBannerArr){
        state.bannerList=reqBannerArr
    },
    GET_RECOMMEND_LIST(state,recommendArr){
        state.recommendList=recommendArr
    },
    GET_FLOOR_LIST(state,floorArr){
        state.floorList=floorArr
    }
}
const actions={
    // 获取三级分类列表的异步aciton
    async getCategoryList({commit}){
        // 发送ajax请求(调用请求接口函数)
    const result = await reqCategoryList()
        // 如果请求成功了，将得到数据提交给mutation
        if(result.code===200){
            const reqCategrouArr = result.data
            commit('GET_CATEGROY_LIST',reqCategrouArr)
        }
    },
    // 获取首页轮播图的异步action
    async getBannerList({commit}){
        const result =await reqBannerList()
        if(result.code===200){
            const reqBannerArr = result.data
            console.log(reqBannerArr);
            commit('GET_BANNER_LIST',reqBannerArr)
        }
    },
    // 获取今日推荐的异步action
    async getRecommendList({commit}){
        // 发送ajax请求
        const result = await reqRecommendList()
        // 如果成功，将数据提交的mutation
        if(result.code===200){
            const recommendArr = result.data
            commit('GET_RECOMMEND_LIST',recommendArr)
        }
    },
    //获取楼层数据的异步action
    async getFloorList({commit}){
        const result = await reqFloorList()
        if(result.code===200){
            const floorArr = result.data
            commit('GET_FLOOR_LIST',floorArr)
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

// import {reqCategoryList} from '../../api'
// const state={
//     categoryList:[]
// }
// const mutations={
//     GET_CATEGORY_LIST(state,categoryArr){
//         state.categoryList=categoryArr.splice(0,15)
//     }
// }
// const actions={
//     getCategoryList({commit}){
//         reqCategoryList().then(result=>{
//             if(result.code===200){
//                 const categoryArr =result.data
//                 commit('GET_CATEGORY_LIST',categoryArr)
//             }
//         })
//     }
// }
// const getters={}

// export default {
//     state,
//     mutations,
//     actions,
//     getters
// }