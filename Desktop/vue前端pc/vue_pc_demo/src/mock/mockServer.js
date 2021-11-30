import Mock from 'mockjs'
import floors from './floors.json'
import recommends from './recommends.json'
// 提供今日推荐的接口

//  /mock/recommends 是接口地址
Mock.mock('/mock/recommends',{
    // 设置返回的数据结构 
    code:200,
    data:recommends
})
// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    // 设置返回的数据结构 
    code:200,
    data:floors
})
console.log('MokeServe');