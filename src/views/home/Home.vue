<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" />
    <van-tabs sticky>
      <van-tab v-for="channels in channelsList" :key='channels.id' :title="channels.name">
        <!-- <div slot="title" @click="onClickId(item.id)">{{item.name}}</div> -->
        <home-content :channel="channels"></home-content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChannelsData } from "../../utils/home.js";
import HomeContent from "./components/HomeContent";
// import { raw } from 'express';
// import { log } from 'util';
export default {
  name: "Home",
  data() {
    return {
      channelsList: []
    };
  },
  components: {
    HomeContent
  },
  created() {
    this.getAllChannels();
  },

  methods: {
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