<template>
  <div class="search">
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @focus="searchRelated" @blur="searchResult" />
    <search-related :related="value" v-if="isSearchShow"></search-related>
    <search-result :result-list="resultList" v-else></search-result>
    <search-history v-if="value === ''"></search-history>
  </div>
</template>

<script>
import SearchRelated from "./components/SearchRelated";
import SearchHistory from "./components/SearchHistory";
import SearchResult from "./components/SearchResult";
import { getSearchResultData } from "../../utils/search";
export default {
  name: "Search",
  data() {
    return {
      isSearchShow:false,
      value: "",
      resultList: []
    };
  },
  components: {
    SearchRelated,
    SearchHistory,
    SearchResult
  },
  methods: {
    searchRelated(){
      this.isSearchShow = true
    },
    async searchResult() {
      const { data } = await getSearchResultData(this.value);
      let { results } = data.data;
      this.resultList = results;
      this.isSearchShow = false
    }
  }
};
</script>
<style scoped lang="less">
</style>