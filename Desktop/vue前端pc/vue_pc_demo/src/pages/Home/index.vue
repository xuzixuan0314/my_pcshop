<template>
  <div>
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Brand/>
    <Floor/>
  </div>
</template>

<script>
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import ListContainer from '@/pages/Home/ListContainer'
import Rank from '@/pages/Home/Rank'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import TypeNav from '@/pages/Home/TypeNav'
export default {
  name: 'Home',
  components:{
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
    TypeNav
  }
}
</script>

<style lang="less" scoped>

</style>
