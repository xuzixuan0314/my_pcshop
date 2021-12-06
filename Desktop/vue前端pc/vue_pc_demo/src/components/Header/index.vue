<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if='userInfo.name'>
            <router-link to='/login'>{{userInfo.name}}</router-link>
            <a href="javascript:;" class="register" @click="logOut">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to='/login'>登录</router-link>
            <router-link to='/register' class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to='/center'>我的订单</router-link>
          <router-link to='/shopCart'>我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
          <router-link to='/' >
            <img src="./images/logo.png" alt="" />
          </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            v-model.trim='keyword'
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
          />
          <button @click='search' class="sui-btn btn-xlarge btn-danger" type="button">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  data(){
    return {
      keyword:''
    }
  },
  methods:{
    // 采用编程式导航的时候，设置了params参数，如果不传入params参数会出问题
    // 所以可以将params和query的赋值定义在location外面，先判断当前是否是空串再传值
    // 在path路径的parmas的占位符后面加上一个？号表示这个参数可传可不传
    search(){
      const location={
          name:'search',
          query:this.$route.query  //将当前就有的query参数携带上
      }
      if(this.keyword){
        location.params={keyword:this.keyword}
        // location.query={keyword2:this.keyword.toUpperCase()}
      }
      if(this.$route.name==='search'){
        this.$router.replace(location).catch(()=>{})
      }else{
        this.$router.push(location).catch(()=>{})
      }
    },
    // 退出登录
    async logOut(){

      try {
        await this.$store.dispatch('logOut')
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed:{
    ...mapState({
      userInfo:state=>state.user.userInfo
    })
  },
  // 
  mounted(){
    this.$bus.$on('removeKeyword',()=>{
      this.keyword=''
    })
  },
  beforeDestroy(){
    this.$bus.off('removeKeyword')
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
