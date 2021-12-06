<template>
  <div class="spec-preview" @mousemove="moveMask" ref='specPreview'>
    <img :src="defaultImg.imgUrl" />
    <div class="event"></div>
    <div class="big" >
      <img :src="defaultImg.imgUrl" ref='big'/>
    </div>
    <div class="mask" ref='mask'></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return {
        // 默认显示的图片的下标
        defaultIdex:0
      }
    },
    props:['skuImageList'],
    computed:{
      defaultImg(){
        return this.skuImageList[this.defaultIdex]||{}
      }
    },
    mounted(){
      this.$bus.$on('changeBiggerImg',this.changeBiggerImg)
    },
    methods:{
      changeBiggerImg(index){
        console.log('@@@@');
        this.defaultIdex=index
      },
        // 移动蒙板 放大镜
      moveMask(event){
        const mouseX = event.offsetX
        const mouseY = event.offsetY
        const maskNode = this.$refs.mask
        let moveMaskX = mouseX-maskNode.offsetWidth/2
        let moveMaskY = mouseY-maskNode.offsetHeight/2
        // 这样移动会超出屏幕，需要价格判断修正一下
        const specPreviewNode = this.$refs.specPreview
        // 向右移动最大值
        const maxRight = specPreviewNode.offsetWidth-maskNode.offsetWidth
        // 向下移动最大值
        const maxBottom = specPreviewNode.offsetHeight-maskNode.offsetHeight
        if(moveMaskX<0){
          moveMaskX=0
        }else if(moveMaskX>maxRight){
          moveMaskX=maxRight
        }
        if(moveMaskY<0){
          moveMaskY=0
        }else if(moveMaskY>maxBottom){
          moveMaskY=maxBottom
        }
        const bigNode = this.$refs.big
        // 设置大图的移动 注意大图移动的方向和蒙板是相反的
        bigNode.style.left=-moveMaskX*2+'px'
        bigNode.style.top=-moveMaskY*2+'px'
        // 注意 是设置style的left和top属性 别搞错了
        maskNode.style.left=moveMaskX+'px'
        maskNode.style.top=moveMaskY+'px'
      }
    },
  
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>