// 这个是关于用户信息的工具包
let USER_TOKEN = 'USER_TOKEN'
// 这个函数是让用户获得唯一标识 
// 先在localStorage中去取，如果有就用，如果没有就随机生成一个
import { v4 as uuidv4 } from 'uuid';
function getUserTempId(){
    let userTempId = localStorage.getItem('user_tempId')
    if(!userTempId){
        userTempId = uuidv4()
        // 并将userTempId存储到localStorage中
        localStorage.setItem('user_tempId',userTempId)
    }
    return userTempId
}
// 将存储token的key改成一个变量，方便以后修改
// 将token存储在localStorage中
function setToken(token){
    localStorage.setItem(USER_TOKEN,token)
}
// 读取token
function getToken(){
    return localStorage.getItem(USER_TOKEN)
}
// 删除token
function removeToken(){
    localStorage.removeItem(USER_TOKEN)
}
// 向外分别暴露
export {getUserTempId,setToken,getToken,removeToken}