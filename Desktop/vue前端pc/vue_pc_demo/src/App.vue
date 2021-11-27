<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import {getCategoryList} from './api'
export default {
  name: 'App',
  mounted(){
    // 在挂载完毕后发送ajax请求,返回的是promise对象 也可以用async和await这里先用.then
    // getCategoryList().then(result=>{
    //   console.log(result)
    // })
    this.$store.dispatch('getCategroyList')
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
