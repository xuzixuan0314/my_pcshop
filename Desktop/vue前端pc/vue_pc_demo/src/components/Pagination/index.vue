<template>
  <div class="pagination">
    <button :disabled='currentPageNum===1?true:false' @click='$emit("tabPage",currentPageNum-1)'>上一页</button>
    <button v-if='startEnd.start>1' @click='$emit("tabPage",1)'>1</button>
    <button v-if='startEnd.start>2'>···</button>
    <button v-for='page in startEnd.end' 
      v-if='page>=startEnd.start' 
      :key='page' 
      @click='$emit("tabPage",page)'
      :class='{active:currentPageNum===page}'
    >{{page}}</button>
    <button v-if='startEnd.end<totalPage-1'>···</button>
    <button v-if='startEnd.end<totalPage' @click='$emit("tabPage",totalPage)'>{{totalPage}}</button>
    <button :disabled='currentPageNum===totalPage?true:false' @click='$emit("tabPage",currentPageNum+1)'>下一页</button>
    
    <button style="margin-left: 30px">共 {{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      total:Number,//总条数
      currentPageNum:{//当前页
        type:Number,
        require:true
      },
      pageSize:Number,//每页数量
      continueNum:{//连续显示数量
        require:true
      }
    },
    computed:{
      // 计算得到总页数
      totalPage(){
        //使用向上取整
        return Math.ceil(this.total/this.pageSize)
      },
      // 连续页
      startEnd(){
        const {totalPage,continueNum,currentPageNum} = this
        let start=''
        let end=''
        if(totalPage<=continueNum){
          start=1
          end=totalPage
        }else{
          start = currentPageNum-Math.floor(continueNum/2)
          end = currentPageNum+Math.floor(continueNum/2)
          // 修正 
          if(start<1){
            // diffVal 是差值   比如 1 2 3 4 5 6 7 8 9 当前是2 经过上面的运算后 start变成了0  0 1 2 3 4
            //  此时diffVal就是1 修成后变成 1 2 3 4 5 
            const diffVal = 1-start
            start+=diffVal
            end+=diffVal
          }
          if(end>totalPage){
            const diffVal=end-totalPage
            start-=diffVal
            end-=diffVal
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>