<template>
  <!-- <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage,index) in skuImageList" :key="skuImage.id">
        <img  :class='{active:defaultImgIndex===index}' @click='selectDefaultImg(index)' :src="skuImage.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
  <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(skuImage,index) in skuImageList" :key="skuImage.id">
          <img  :class='{active:defaultImgIndex===index}' @click='selectDefaultImg(index)' :src="skuImage.imgUrl">
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    data(){
      return {
        defaultImgIndex:0,
        swiperOptions:{
          // 设置slider容器能够同时显示的slides数量
          slidesPerView: 5,
          // 设置slides的数量多少为一组
          slidesPerGroup : 3,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      }
      }
    },
    methods:{
      selectDefaultImg(index){
        this.defaultImgIndex=index
        this.$bus.$emit('changeBiggerImg',index)
      }
    },
    name: "ImageList",
    props:['skuImageList']
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>