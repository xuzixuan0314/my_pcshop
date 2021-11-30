<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend :recommendList='recommendList'/>
    <Rank/>
    <Like/>
    <Brand/>
    <Floor v-for='(item,index) in floorList' :key="index" :floor='item' />
  </div>
</template>

<script>
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components:{
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
  mounted(){
    //获取recommend数据
    this.$store.dispatch('getRecommendList')
    // 获取floor数据
    this.$store.dispatch('getFloorList')
  },
  computed:{
    // 在home组件中接受数据，然后传递给子组件
    ...mapState({
      floorList:state=>state.home.floorList,
      recommendList:state=>state.home.recommendList,
    })
  }
}
</script>

<style lang="less" scoped>

</style>
