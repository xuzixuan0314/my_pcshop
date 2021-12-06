const Home = ()=>import('@/pages/Home')

const Search =()=>import('@/pages/Search')
const Login = ()=>import('@/pages/Login')
const Register=()=>import('@/pages/Register')
const Deatil =()=>import('@/pages/Detail')
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import TodayRecommend from '@/pages/Home/TodayRecommend'
// import Deatil from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'
export default [
    // home路由
    {
        path:'/',
        component:Home,
    },
    // login路由
    {
        path:'/login',
        component:Login,
        meta:{
            isHideFooter:true
        },
        beforeEnter:(to,from,next)=>{
            if(store.state.user.token){
                next('/')
            }else{
                next()
            }
        }

    },
    // search路由
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        // 路由的props参数
        // props:true//传入一个布尔值表示，params参数会被设置为组件的属性
        // 传入一个函数可以自定义组件属性
        props:(route)=>{
            return{
                keyword3:route.params.keyword,
                keyword4:route.query.keyword2
            }
        },
       
    },
    // register路由
    {
        path:'/register',
        component:Register,
        meta:{
            isHideFooter:true
        }
    },
    // detail路由
    {
        // 根据接口文档,需要一个id参数 且是params参数
        path:'/detail/:skuId',
        component:Deatil
    },
    // addCartSuccess添加购物车成功路由
    {
        name:'addCartsSuccess',
        path:'/addCartsSuccess',
        component:AddCartSuccess,
        beforeEnter:(to,from,next)=>{
            if(to.query.goodsNum&&sessionStorage.getItem('addCartsSuccsee')){
                next()
            }else{
                next('/')
            }
        }
    },
    // shopCart跳转到购物车的路由
    {
        path:'/shopcart',
        component:ShopCart
    },
    // trade跳转提交订单页面
    {
        path:'/trade',
        component:Trade,
        beforeEnter:(to,from,next)=>{
            if(from.path==='/shopCart'){
                next()
            }else{
                next('/')
            }
        }
    },
    //pay跳转支付
    {
        path:'/pay',
        component:Pay,
        beforeEnter:(to,from,next)=>{
            if(from.path==='/trade'){
                next()
            }else{
                next('/')
            }
        }
    },
    // paysuccess 跳转支付成功
    {
        path:'/paysuccess',
        component:PaySuccess,
        beforeEnter:(to,from,next)=>{
            if(from.path==='/pay'){
                next()
            }else{
                next('/')
            }
        }
    },
    // center 跳转订单中心
    {
        path:'/center',
        component:Center,
        redirect:'/center/myorder',
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            // {
            //     path:'',
            //     redirect:'myorder'
            // }
        ]
    }
]