<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" />
    <van-tabs sticky >
      <van-tab v-for="item in channelsList"  :key='item.id' :title="item.name">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item2 in list" :key="item2.aut_id" :title="item2.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  getAllChannelsData,
  getChannelsArticlesData
} from "../../utils/home.js";
export default {
  name: "Home",
  data() {
    return {
      channelsList: [],
      list: [],
      params:{
        channel_id: 2,
        timestamp:Date.now(),
        with_top:1
      },
      loading: false,
      finished: false
    };
  },
  created() {
    this.getAllChannels();
  },

  methods: {
    onbtn(id){
      console.log(id);
    },
    async onLoad(id) {
      // this.params.channel_id = id;
      const {data} = await getChannelsArticlesData(this.params);
      const {results:res} = data.data;
      this.list = res
      // console.log(this.list);
    },
    async getAllChannels() {
      const { data } = await getAllChannelsData();
      const { channels } = data.data;
      this.channelsList = channels;
    }
  }
};
</script>
<style scoped lang="less">
@color_b: #439ffa;
.home {
  .van-search {
    background-color: @color_b;
    ::v-deep .van-search__content {
      background-color: #5babfb;
      border-radius: 30px;
      ::v-deep .van-field__control {
        color: red;
      }
    }
  }
  .van-tabs {
    ::v-deep .van-tabs__line {
      background-color: @color_b;
    }
    
  }
}
</style>