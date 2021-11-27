// 包含所有的接口的接口请求函数
    //函数内部是调用ajax发送请求
    // 返回的类型是promise对象
import ajax from './ajax'
// 获取商品的三级分类列表
export function reqCategoryList(){
    // return ajax.get('/product/getBaseCategoryList')
    // return ajax('/product/getBaseCategoryList')//发不带参数的get请求 可以将get省略
    return ajax({
        url:'/product/getBaseCategoryList',
        // method:'get' 默认就是get  可以省略
    })

}
