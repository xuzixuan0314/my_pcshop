import Vue from 'vue'
import VueRouter  from 'vue-router'
import routes from './routes'
import store from '../store'
Vue.use(VueRouter)
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
// replace同理处理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}

const router = new VueRouter({
    // 设置路由的默认滚动行为
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      return { x: 0, y: 0 }
    },
    mode:'history',
    routes
})
// 设置全局前置路由守卫
// router.beforeEach((to,from,next)=>{
//   next()
  
// })  
router.beforeEach(async(to,from,next)=>{
  // to:表示要到哪个路由组件里去
  // from:表示从哪个组件里来
  // next:是个函数
  //      next()表示全部放行 
  //      next(false)代表不放行,停在原地
  //      next({path:'/'})代表他最终去哪

  // 这里需要对是否存在token进行判断 有token代表是登录状态,没有token表示不是登录状态
  let token = store.state.user.token
  // userInfo是个对象,读取任意一个属性，使用！！将其转换为布尔类型
  let hasUserInfo = !!store.state.user.userInfo.nickName
  if(token){
    // 说明已经登录了,接下来要判断是要跳转到哪个组件
    if(to.path==='/login'){
      // 登陆过了，直接跳转到首页
      next('/')
    }else{
      if(hasUserInfo){
        // 说明已经登录并且有用户信息了,就不需要再发请求,直接通过就可以了
        // 刷新页面后userInfo的信息就会丢失,需要重新发请求后去
        next()
      }else{
        // 登录过了,但是没有用户信息，说明vuex中的用户信息是空的,需要发送请求重新校验获取,
        // 相当于刷新页面或者重新打开浏览器之后需要再次发请求验证登录身份
        // 登录过了,去的不是登录页，要根据token发请求获取用户真正信息 
        try {
          await store.dispatch('getUserInfo')
          // 获取用户信息成功后就直接放行
          next()
        } catch (error) {
          alert('token已经过期了')
          this.$store.dispatch('resetToken')
          // 失败了会跳到登录界面去登录，如果登录成功了，就需要跳转到原本要去的组件
          // 需要携带一个query参数，然后在登录的组件中配合使用跳转
          next(`/login?redirect=${to.path}`)
        }
      }
      
    }
  }else{
    // 没有token说明没有登录,
    // 如果要跳转到结算等需要登录后才能进入的界面的话就跳转到登录
    // 后期我们需要判断用户是不是去订单相关的页面，如果是就先登录


    // 没有登录想要跳转到支付相关，交易相关，用户相关的需要先跳转到登录页面，登录成功后跳转到之前想去的页面
    if(to.path.indexOf('/center')!==-1||to.path.startsWith('/pay')||to.path.startsWith('/trade')){
        next('/login?redirect='+to.path)
    }else{
      next()
    }
  }
})   
export default router