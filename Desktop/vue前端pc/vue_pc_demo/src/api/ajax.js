import axios from 'axios'

import NProgress from 'nprogress'
// 需要手动引入样式
import 'nprogress/nprogress.css'

// 配置通用的基础路径和超时时间
const service = axios.create({
    baseURL:'/api',
    timeout:20000
})

// 设置请求拦截器
service.interceptors.request.use((config)=>{
    // 请求拦截器是在请求将要发出的时候调用，在这里添加开始的进度条
    NProgress.start()
    // 必须要将config返回，在里面对config进行操作后返回  后面会根据返回的config，使用xhr对象发送ajax请求
    return config
},()=>{})//这里可以传入一个回调，不用也可以不传 一般不用

// 请求拦截器和响应拦截器中间会根据config文件发送异步ajax请求 ，如果成功了会创建response对象 再执行响应拦截器

// 设置响应拦截器
service.interceptors.response.use(
        (response)=>{
            // 不管是成功还是失败都将进度条结束
            NProgress.done()

            // 成功的回调
            return response.data
        },
        (error)=>{
            // 失败的回调
            NProgress.done()
            // 统一处理错误，具体请求可以处理也可以不处理
            alert(error.message||'位置的q请求错误')
            // 注意，这里不能直接return error 因为返回error是返回一个成功的promise，只不过他的内容是error
            return Promise.reject(error) 
            // 也可以抛出错误   throw error 也是失败的回调
           
        }
    )
// service.get('/xxx').then(result=>{
//     //相应拦截器里成功的回调的返回值会来到这里，所以可以在相应拦截器中就将返回值设置为response.data 
//     // 在这里直接通过result接收
// }).catch(error=>{
//     // 做一些 提示之外特定的工作 比如关闭定时器什么的
// })

// 执行流程 
// service发送get请求后 
// Promise.resolve(config)
// .then((config)=>{return config})//请求拦截器
// .then((config)=>{return new Promise((resolve,reject)=>{根据config使用xhr发ajax请求})})
// .then()//响应拦截器
// 会根据config文件创建一个promise成功的回调，然后在他的.then就是请求拦截器，在里面修改配置config,
//第二个.then根据config使用xhr发送ajax请求,第三个.then是相应拦截器，最终响应拦截器成功的回调会传给get的成功的回调
export default service