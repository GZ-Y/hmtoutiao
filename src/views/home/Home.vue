<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" @focus="onFocus"/>
    <van-tabs v-model="active">
      <van-tab v-for="channels in channelsList" :key='channels.id' :title="channels.name">
        <home-content :channel="channels"></home-content>
      </van-tab>
    </van-tabs>

    <div class="edit">
      <van-icon @click="onShow" name="wap-nav" />
    </div>
    <van-popup get-container="body" v-model="isDialogShow" position="top" :style="{ width:'100%',height: '100%' }" closeable close-icon-position="top-left">
      <edit-content :user-channel="channelsList" :active="active" @closeDialog="closeDialog"></edit-content>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsData } from "../../utils/home.js";
import HomeContent from "./components/HomeContent";
import EditContent from "./components/EditContent";
import { mapState } from "vuex";

// import { raw } from 'express';
// import { log } from 'util';
export default {
  name: "Home",
  data() {
    return {
      active:0,
      channelsList: [],
      isDialogShow: false
    };
  },
  components: {
    HomeContent,
    EditContent
  },
  created() {
    if (this.user) {
      this.getUserChannels();
    }
      this.getUserChannels();
  },
  computed: {
    ...mapState(["user"])
  },
  
  methods: {
    onFocus(){
      this.$router.push('/search')
    },
    closeDialog(index){
      this.isDialogShow = false;
      this.active = index;
    },
    getContainer() {
      return document.querySelector("body");
    },
    onShow() {
      this.isDialogShow = true;
    },
    //请求获取我的频道数据列表
    async getUserChannels() {
      const { data } = await getUserChannelsData();
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
  }
  ::v-deep .van-grid-item__content {
    width: 80px;
    height: 20px;
    font-size: 15px;
  }
}
</style>