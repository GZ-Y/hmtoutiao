<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" />
    <van-tabs sticky>
      <van-tab v-for="channels in channelsList" :key='channels.id' :title="channels.name">
        <!-- <div slot="title" @click="onClickId(item.id)">{{item.name}}</div> -->
        <home-content :channel="channels"></home-content>
      </van-tab>
    </van-tabs>
    <div class="edit">
      <van-icon @click="onShow" name="wap-nav" />
    </div>
    <van-popup v-model="isShow" position="top" 
    :style="{ width:'100%',height: '100%' }" closeable close-icon-position="top-left">
      <div class="popup_my">
        <span>我的频道</span>
        <van-button round type="info">编辑</van-button>
        <van-grid :gutter="10">
          <van-grid-item v-for="channels in channelsList" :key='channels.id' icon="photo-o" text="文字">
            {{channels.name}}
          </van-grid-item>
        </van-grid>
      </div>
      <div class="popup_recommend">
        <span>频道推荐</span>
      </div>
    </van-popup>
    <!-- <div class="footer_block">123</div> -->

  </div>
</template>

<script>
import { getAllChannelsData } from "../../utils/home.js";
import HomeContent from "./components/HomeContent";
import EditContent from "./components/EditContent";
// import { raw } from 'express';
// import { log } from 'util';
export default {
  name: "Home",
  data() {
    return {
      channelsList: [],
      isShow: true
    };
  },
  components: {
    HomeContent,
    EditContent
  },
  created() {
    this.getAllChannels();
  },

  methods: {
    onShow() {
      this.isShow = true;
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
  position: relative;
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
  .footer_block {
    height: 50px;
    background: #439ffa;
    position: relative;
    bottom: 0;
    z-index: 1;
  }
  .edit {
    width: 20px;
    height: 20px;
    position: fixed;
    top: 62px;
    right: 0px;
    padding-right: 5px;
    z-index: 2;
    background-color: white;
    opacity: 0.8;
  }

  ::v-deep .van-popup {
    width: 375px;
    padding: 55px 15px 0 15px;
    .popup_my {
      ::v-deep .van-button {
        margin-left: 185px;
      }
    }
  }
  ::v-deep .van-grid-item__content {
    width: 80px;
    height: 20px;
    font-size: 15px;
  }
}
</style>