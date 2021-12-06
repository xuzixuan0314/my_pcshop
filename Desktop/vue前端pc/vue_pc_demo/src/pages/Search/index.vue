<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if='options.categoryName'>{{options.categoryName}}<i @click='removeCategory'>×</i></li>
            <li class="with-x" v-if='options.keyword'>{{options.keyword}}<i @click='removeKeyword'>×</i></li>
            <li class="with-x" v-if='options.trademark'>{{options.trademark}}<i @click='removeTrademark'>×</i></li>
            <li class="with-x" v-for='(prop,index) in options.props' :key="prop">{{prop}}<i @click='removeProp(index)'>×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector  :setTrademark='setTrademark' @addProp='addProp'/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 设置排序选项的背景颜色 -->
                <li :class="{active:sortFlag==='1'}" @click='sortGoods("1")'>
                  <a href="javascript:;">综合
                    <i class='iconfont' v-if="sortFlag==='1'" :class="{
                      icondown1:sortType==='desc',
                      iconup1:sortType==='asc'
                    }"></i>
                  </a>
                </li>
                <li :class="{active:sortFlag==='2'}" @click='sortGoods("2")'>
                  <a href="javascript:;">价格
                    <i v-if="sortFlag==='2'" 
                      class='iconfont' :class="{
                      icondown1:sortType==='desc',
                      iconup1:sortType==='asc'
                    }"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
              <h2>{{goodsList.length}}</h2>

            <ul class="yui3-g" >
              <li class="yui3-u-1-5" v-for='goods in goodsList' :key='goods.id'>
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                    <!-- <a href="javascript:;">{{goods.title}}</a>  -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
          <!-- total:总条数  currentPageNum：当前页  pageSize：每页条数  continueNum：连续数量 一般是奇数 -->
          <MyPagination
            :total='searchList.total'
            :currentPageNum='options.pageNo'
            :pageSize='options.pageSize'
            :continueNum='3'
            @tabPage='tabPage'
          ></MyPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return {
        options:{
          category1Id:'',//一级分类id
          category2Id:'',//二级分类id
          category3Id:'',//三级分类id
          categoryName:'',//分类名称
          keyword:'',//搜索关键字
          props:[],//商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          trademark:'',//	品牌: "ID:品牌名称"示例: "1:苹果"
          order:'2:asc',//排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
          pageNo:1,//页码
          pageSize:8//数量
        }
      }
    },
    created(){
      // 在created阶段 就将params参数和query参数读取出来，发送请求 如果在moutned阶段发送的话，就会在页面挂载完成后再发送请求，会多发一次
      // 将params参数和query参数取出来，如果有就取，如果没有就是空，json文件中，空是不会显示的
      // this.updataParams()
      // this.getShopList()
    },
    components: {
      SearchSelector
    },
    computed:{
      // 想要获取到的是对象中的goodsList数组
      // 注意：如果初始值是个空对象的话searchList.goodsList是undefined
      // 使用v-for 遍历goodsList (undefined)不会报错，但是如果使用
      // 遍历goodsList.length 就会报错  所以 需要在后面设置||[] 如果是undefined就为[]
      // ...mapState({
      //   goodsList:state=>state.search.searchList.goodsList||[]
      // })
      ...mapGetters(['goodsList']),
      ...mapState({
         searchList:state=>state.search.searchList
      }),

      sortFlag(){
        return this.options.order.split(':')[0]
      },
      sortType(){
        return this.options.order.split(':')[1]
      },
      // 通过计算属性得到详情页路由跳转的params参数
    },
    methods:{
      // 更新options中的参数属性
      updataParams(){
        const {keyword} =this.$route.params
        const {category1Id,category2Id,category3Id,categoryName} = this.$route.query
        let newOptions={
          // es6的语法，解构赋值  直接把this.options的数据读进来，后面的会覆盖前面的
          ...this.options,
          keyword,
          category1Id,
          category2Id,
          category3Id,
          categoryName
        }
        Object.keys(newOptions).forEach(item=>{
          if(newOptions[item]===''){
            delete newOptions[item]
          }
        })
        newOptions.pageNo=1
        this.options=newOptions
      },
      // 获取商品列表的请求
      getShopList(){
        this.$store.dispatch('getSearchList',this.options)
      },
      // 点击删除分类数据
      removeCategory(){
        this.options.pageNo=1 
        this.options.category1Id=''
        this.options.category2Id=''
        this.options.category3Id=''
        this.options.categoryName=''
        // 点击删除分类数据后，不在发送请求而是直接跳转到不带分类参数的search
        this.$router.replace({
          name:'search',
          params:this.$route.params
        })
        this.getShopList()
      },
      // 点击删除搜索的参数
      removeKeyword(){
        this.options.pageNo=1
        this.options.keyword=''
        // 点击删除分类数据后，不在发送请求而是直接跳转到不带搜索参数的search
        this.$router.replace({
          name:'search',
          query:this.$route.query
        })
        this.getShopList()
        this.$bus.$emit('removeKeyword')
      },
      // 分析：需要在父组件中使用函数发送请求，父亲想要孩子的数据
      // 使用函数式props参数 在父组件中定义函数，并调用发送请求 
      // 有一个小问题，如果当前已经是选中的品牌名的话再次点击就不要再发送请求了 添加一个判断
      setTrademark(trademark){
        this.options.pageNo=1

        // 添加判断
        if(this.options.trademark===trademark) return
        this.options.trademark=trademark
        this.getShopList()
      },
      removeTrademark(){
        this.options.pageNo=1
        this.options.trademark=''
        this.getShopList()
      },
      addProp(prop){
        const {props} = this.options
        if(props.includes(prop)) return
        // 如果prop不在props中 就向props中压入prop
        props.push(prop)
        // 重新请求获取数据列表
        this.options.pageNo=1
        this.getShopList()
      },
      removeProp(index){
        this.options.pageNo=1
        this.options.props.splice(index,1)
        this.getShopList()
      },
      sortGoods(sortFlag){
        this.options.pageNo=1
        const originSortFlag = this.sortFlag
        const originSortType = this.sortType
        let newOrder=''
        if(sortFlag===originSortFlag){
          newOrder=`${sortFlag}:${originSortType==='asc'?'desc':'asc'}`
        }else{
          newOrder=`${sortFlag}:asc`
        }
        this.options.order=newOrder
        this.getShopList()
      },
      tabPage(num){
        this.options.pageNo=num
        this.getShopList()
      }
    },
    watch:{
      // $route(to,from){
      //   this.updataParams()
      //   this.getShopList()
      // }
      $route:{
        handler(){//参数变化
          this.updataParams()
          this.getShopList()
        },
        immediate:true//初始化立即执行一次
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>