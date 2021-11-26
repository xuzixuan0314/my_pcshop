<template>
  <div>
    Search
    {{$route.params.keyword}}{{$route.query.keyword2}}
    params参数:{{keyword3}} query参数为:{{keyword4}}
  </div>

</template>

<script>
export default {
  name: 'Search',
  props:['keyword3','keyword4']
}
</script>

<style lang="less" scoped>

</style>
