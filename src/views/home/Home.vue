<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" @focus="$router.push('/search')" />
    <van-tabs v-model="active">
      <van-tab v-for="(channel,index) in channels" :key='index' :title="channel.name">
        <home-content :channel="channel" />
      </van-tab>
    </van-tabs>
    <!-- <scroll class="warpper_scroll" :pull-up-load='true' @scroll="onScroll" ref="scroller">
      <test-scroll :arr-list="arrList" @imageLoad="imageLoad" />
    </scroll> -->
    
    <div class="edit">
      <van-icon @click="onShow" name="wap-nav" size="0.6rem" />
    </div>
    <van-popup get-container="body" v-model="isDialogShow" position="top" :style="{ width:'100%',height: '100%' }" closeable close-icon-position="top-left">
      <edit-content :user-channel="channels" :active="active" @closeDialog="closeDialog"></edit-content>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsData } from "../../utils/home";
import { getItem, setItem } from "../../utils/storage";

import { mapState } from "vuex";

import HomeContent from "./components/HomeContent";
import EditContent from "./components/EditContent";

import TestScroll from "./components/TestScroll";

import Scroll from "../../components/Scroll";
// import { setTimeout } from "timers";
// Vue.use(ImagePreview)
import Vue from "vue";
import vuescroll from "vuescroll/dist/vuescroll-slide";
import "vuescroll/dist/vuescroll.css";
import { setTimeout } from "timers";
Vue.use(vuescroll);
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      channel: {},
      channels: [],
      isDialogShow: false,
      isBackTop: false,
      currentIndex: 0,
     
    };
  },
  components: {
    HomeContent,
    EditContent,
    Scroll,
    vuescroll,
    TestScroll
  },
  created() {
    // if (this.user) {
    //   this.getUserChannels();
    // }
    this.getUserChannels();
  },

  computed: {
    ...mapState(["user"]),
    channelItem() {
      return this.channels[this.currentIndex];
    }
  },

  methods: {
    // imageLoad() {
    //   console.log("全部加载完成");
    //   this.$refs.scroller[0].refresh();
      
    // },
    // onPullingUp() {
    //   console.log("上拉加载更多");
    // },
    // onPullingDown() {
    //   console.log("下拉刷新");
    // },
    // onScroll(position) {
    //   console.log(position.y);
    // },

   
    closeDialog(index) {
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
      try {
        const { data } = await getUserChannelsData();
        const { channels } = data.data;
        this.channels = channels;
      } catch (err) {
        if (err.request.status === 401) {
          this.$toast.loading({
            message: "登录已经过期，请重新登录",
            duration: 1500,
            onClose: () => {
              this.$router.push("/login");
            }
          });
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@color_b: #439ffa;
.home {
  position: relative;
  z-index: 101;
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
    ::v-deep .van-tabs__nav {
      margin-right: 31px;
    }
    ::v-deep .van-tabs__line {
      background-color: @color_b;
    }
  }
  ::v-deep .warpper_scroll {
    position: absolute;
    height: calc(100vh - 98px - 50px);
    border: 1px solid red;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
  }
  .footer_block {
    height: 50px;
    background: #439ffa;
    position: relative;
    bottom: 0;
    z-index: 1;
  }
  
  .edit {
    position: fixed;
    // top: 62px;
    // right: 0px;
    top: 65px;
    right: 0;

    // width: 20px;
    // height: 20px;

    padding-right: 7px;

    z-index: 2;
    background-color: white;
    opacity: 0.8;
    /deep/ .van-icon::before {
      padding-top: 0.5px;
    }
  }

  ::v-deep .van-grid-item__content {
    width: 80px;
    height: 20px;
    font-size: 15px;
  }
}
</style>