<template>
  <div class="search">
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @focus="searchRelated" @blur="searchResult" @search="onSearch" @input="onInput" />
    <van-cell-group>
      <van-cell title="" v-if="!isDelete">
        <div slot="default">
          <van-icon name="delete" @click="showDeleteOption"></van-icon>
        </div>
      </van-cell>
      <van-cell title="" v-else>
        <div slot="default">
          <span class="allDelete" @click="onAllDelete">
            {{historyList.length !== 0?'全部删除':''}}
          </span>
          <span @click="completeDelete">完成</span>
        </div>
      </van-cell>
    </van-cell-group>
    <search-history :history-list="historyList" :close-show="isDelete" @singleDelete='singleDelete' v-if="value === ''"></search-history>
    <search-result :result-list="resultList" v-else-if="!isSearchShow"></search-result>
    <search-related :related="value" @onRelated="onRelated" v-if="isSearchShow"></search-related>
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
      isSearchShow: false,
      isDelete: false,
      value: "",
      resultList: [],
      historyList: []
    };
  },
  components: {
    SearchRelated,
    SearchHistory,
    SearchResult
  },
  methods: {
    // 删除全部
    onAllDelete() {
      if (this.isDelete) {
        this.$dialog
          .confirm({
            title: "删除",
            message: "您确认要删除全部的历史记录吗？"
          })
          .then(() => {
            this.historyList = [];
          })
          .catch(() => {
            return;
          });
      }
    },
    // 删除单个
    singleDelete(index) {
      this.historyList.splice(index, 1);
    },
    //显示删除选项
    showDeleteOption() {
      this.isDelete = true;
    },
    // 完成删除操作，回到原始状态
    completeDelete() {
      this.isDelete = false;
    },
    //确定搜索时触发
    onSearch() {
      this.isSearchShow = false;
    },
    //表单内容变化时触发
    onInput() {
      this.isSearchShow = this.value === "" ? false : true;
    },
    //获取焦点时触发
    searchRelated() {
      this.isSearchShow = true;
    },
    //失去焦点时触发
    async searchResult() {
      if (this.value.trim()) {
        const { data } = await getSearchResultData(this.value);
        let { results } = data.data;
        this.resultList = results;
      }
    },
    async onRelated(related) {
      const { data } = await getSearchResultData(related);
      let { results } = data.data;
      this.resultList = results;
      console.log(data);
      this.isSearchShow = false;
      this.historyList.unshift(related);
    }
  }
};
</script>
<style scoped lang="less">
.search {
  .van-cell-group {
    .allDelete {
      margin-right: 20px;
    }
  }
}
</style>