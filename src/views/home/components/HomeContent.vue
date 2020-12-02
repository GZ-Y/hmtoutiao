<template>
  <div class="home-content">
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
            <div class="slot_label_name">{{item.aut_name}}</div>
          </div>
          <div class="slot-extra" v-if="item.cover.images.length === 1" slot="extra">
            <img :src="item.cover.images[0]" alt="">
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelsArticlesData } from "../../../utils/home.js";
export default {
  name: "HomeContent",
  data() {
    return {
      list: [],
      timestamp: null,
      loading: false,
      finished: false,
      isLoading: false,
      token: 0
    };
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
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
    }
    .slot-extra {
      img {
        width: 150px;
        height: 100px;
      }
    }
  }
}
</style>