<template>
  <div class="home-content" ref="homeContentRef" @scroll="onScroll">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-duration="3000">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.aut_id" :to="{path:'/articles/'+item.art_id}">
          <div slot="title">{{item.title}}</div>
          <div class="slot_label" slot="label">
            <div class="slot_label_wrap" v-if="item.cover.images.length === 3">
              <div><img :src="item.cover.images[0]" alt=""></div>
              <div><img :src="item.cover.images[1]" alt=""></div>
              <div><img :src="item.cover.images[2]" alt=""></div>
            </div>
            <div class="slot_block" v-if="item.cover.images.length === 1"></div>
            <div class="bottom_info">
              <span>作者:{{item.aut_name}}</span>
              <span>评论{{item.comm_count}}条</span>
              <span>时间:{{item.pubdate | relativeTime}}</span>
            </div>
          </div>
          <div class="slot-extra" v-if="item.cover.images.length === 1" slot="extra">
            <img :src="item.cover.images[0]" alt="">
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <back-top class="back_top" @click.native="onBackTop" v-show="backTopShow" />
  </div>
</template>

<script>
import { getChannelsArticlesData } from "@/utils/home.js";
import dayjs from "dayjs";
import { animation, toTop } from "@/plugins/animation";
// import { setTimeout } from "timers";
import BackTop from "@/components/BackTop";

export default {
  name: "HomeContent",
  data() {
    return {
      list: [],
      timestamp: null,
      loading: false,
      finished: false,
      isLoading: false,
      backTopShow: false,
      token: 0,
      scrollTopVal: 0
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
      default: () => {}
    },
    arrList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    BackTop
  },

  methods: {
    onBackTop() {
      toTop(this.homeContent);
    },
    onScroll() {
      this.homeContent = this.$refs.homeContentRef;
      this.backTopShow = this.homeContent.scrollTop > 1000 ? true : false;
      this.scrollTopVal = this.homeContent.scrollTop;
    },
    //下拉刷新
    async onRefresh() {
      const { data } = await getChannelsArticlesData({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      });
      console.log(data);
      const { results: res } = data.data;
      this.list.unshift(...res);
      this.isLoading = false;
    },
    //上拉加载更多
    async onLoad() {
      try {
        const { data } = await getChannelsArticlesData({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        const { results: res, pre_timestamp: time } = data.data;
        this.list.push(...res);
        this.loading = false;

        this.timestamp = time;
        if (res.length === 0) {
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  //返回页面时保持住之前滚动的距离状态
  activated() {
    if (this.scrollTopVal > 0) {
      this.homeContent.scrollTop = this.scrollTopVal;
    }
  }
};
</script>
<style scoped lang="less">
.home-content {
  position: fixed;
  top: 100px;
  bottom: 50px;
  overflow-y: auto;
  right: 0;
  left: 0;
  ::v-deep .van-list {
    .slot_label {
      .slot_label_wrap {
        display: flex;
        div:not(:last-child) {
          margin-right: 10px;
        }
        div {
          flex: 1;
          img {
            width: 100%;
            height: 100px;
          }
        }
      }
      .slot_block {
        height: calc(107px - 42px);
        background-color: white;
      }
      .bottom_info {
        span:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
    .slot-extra {
      img {
        width: 150px;
        height: 100px;
      }
    }
  }
  .back_top {
    position: fixed;
    top: 80%;
    right: 45px;
    // top: 0;
    // right: 0;
  }
}
</style>