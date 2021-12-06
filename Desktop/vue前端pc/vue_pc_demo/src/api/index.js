// // 包含所有的接口的接口请求函数
//     //函数内部是调用ajax发送请求
//     // 返回的类型是promise对象
// import ajax from './ajax'
// // 获取商品的三级分类列表
// export function reqCategoryList(){
//     // return ajax.get('/product/getBaseCategoryList')
//     // return ajax('/product/getBaseCategoryList')//发不带参数的get请求 可以将get省略
//     return ajax({
//         url:'/product/getBaseCategoryList',
//         // method:'get' 默认就是get  可以省略
//     })

// }


import ajax from './ajax'
import mockAjax from './mockAjax'
export function reqCategoryList(){
    return ajax({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
// 获取轮播数据
export const reqBannerList=()=>ajax.get('/cms/banner')
// 获取search组件的数据 需要传入一个对象作为参数
export const reqSearchList=reqSearchParams=>ajax.post('/list',reqSearchParams)
// 获取detail详情页的数据 需要传入一个params参数 因为返回的数据是个对象 所以叫info合适一些 数组的话就交List
export const reqDetailInfo=(skuId)=>{
    // 使用对象形式
    return ajax({
            url:`/item/${skuId}`,
            method:'get'
        })
    
}
// 添加到购物车之前校验 /api/cart/addToCart/{ skuId }/{ skuNum } 还可以用于修改数量
export const reqAddCartSuccess=(skuId,skuNum)=>{
    return ajax({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}
// 获取购物车列表  /api/cart/cartList  GET 不需要携带参数
export const reqShopCartInfo=()=>{
    return ajax({
        url:'/cart/cartList',
        method:'get'
    })
}
// reqShopCartInfo() 测试接口

// 更新购物车单个商品是否选中 /api/cart/checkCart/{skuID}/{isChecked}
export const UpdateCheckOne=(skuId,isChecked)=>{
    return ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}
// 删除一个购物车/api/cart/deleteCart/{skuId}
export const deleteOne=(skuId)=>{
    return ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
    
}
// 注册用户信息  /api/user/passport/register   POST   请求体参数phone  password  code
export const reqRegister=(userInfo)=>{
    return ajax({
        url:'/user/passport/register',
        method:'post',
        data:userInfo
    })
}
// 登录  /api/user/passport/login POST   phone  password
export const reqLogin=(userInfo)=>{
    return ajax({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}
// 校验用户登录信息
export const reqUserInfo=()=>{
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}
// 退出登录 /api/user/passport/logout
export const reqLogOut=()=>{
    return ajax({
        url:'/user/passport/logout',
        method:'get'
    })
}
// 获取订单交易页信息  /api/order/auth/trade
export const reqTradeInfo=()=>{
    return ajax({
        url:'/order/auth/trade',
        method:"get"
    })
}
// 提交订单信息  /api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder=(tradeNo,orderInfo)=>{
    return ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:orderInfo
    })
}
// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}  GET
export const reqPayOrder=(orderId)=>{
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}
// 获取订单支付的状态 /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqPayState=(orderId)=>{
    return ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}
// 获取我的订单信息 /api/order/auth/{page}/{limit}  page 页码  limit  每页显示数量
export const reqMyOrderInfo=(page,limit)=>{
    return ajax({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}


// mock模拟数据发送请求
// 获取今日推荐
export const reqRecommendList=()=>mockAjax('/recommends')
// 获取楼层数据
export const reqFloorList=()=>mockAjax('/floors')
reqRecommendList().then(reponse=>console.log(reponse))