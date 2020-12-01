<template>
<!-- 搜索结果 -->
  <div class="search-result">
    <van-cell-group>
      <van-cell v-for="(result,index) in resultList" :key="index" :title="result.title" />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name:'SearchResult',
    data() {
      return {

      }
    },
    props:{
      resultList:{
        type:Array,
        required:true
      }
    }
  }
</script>
<style scoped>

</style>