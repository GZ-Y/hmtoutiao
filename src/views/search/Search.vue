<template>
  <div class="search">
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <search-related :related="value"></search-related>
    <search-history></search-history>
    <search-result></search-result>
  </div>
</template>

<script>
import SearchRelated from './components/SearchRelated'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
  export default {
    name:'Search',
    data() {
      return {
        value:''
      }
    },
    components:{
      SearchRelated,
      SearchHistory,
      SearchResult
    }
  }
</script>
<style scoped lang="less">
</style>