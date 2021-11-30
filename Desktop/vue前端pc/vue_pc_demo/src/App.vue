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
export default {
  name: 'App',
  mounted(){
    // 在挂载完毕后发送ajax请求,返回的是promise对象 也可以用async和await这里先用.then
    // getCategoryList().then(result=>{
    //   console.log(result)
    // })
    this.$store.dispatch('getCategoryList'),
    // 在App中发送请求，看是否需要多次发送请求，在App中只需要发一次请求就可以了
    this.$store.dispatch('getBannerList')
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
