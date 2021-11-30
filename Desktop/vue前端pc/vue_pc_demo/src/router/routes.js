
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import TodayRecommend from '@/pages/Home/TodayRecommend'
export default [
    {
        path:'/',
        component:Home,
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHideFooter:true
        }
    },
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
    {
        path:'/register',
        component:Register,
        meta:{
            isHideFooter:true
        }
    },
    
]