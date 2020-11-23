<template>
  <div class="home-content">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-duration="3000">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.aut_id">
          <div slot="title">{{item.title}}</div>
          <div class="slot_label" slot="label">
            <div class="slot_label_wrap" v-if="item.cover.images.length === 3">
              <div><img :src="item.cover.images[0]" alt=""></div>
              <div><img :src="item.cover.images[1]" alt=""></div>
              <div><img :src="item.cover.images[2]" alt=""></div>
            </div>
            <div>{{item.aut_name}}</div>
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
      params: {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      },
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    onRefresh() {
      this.onLoad();
      this.isLoading = false;
    },
    async onLoad() {
      const { data } = await getChannelsArticlesData(this.params);
      const { results: res } = data.data;
      this.list.push(...res);
      console.log(this.list);

      this.loading = false;
    }
  }
};
</script>
<style scoped lang="less">
::v-deep .van-list {
  .slot_label {
    .slot_label_wrap {
      display: flex;
      div:not(:last-child) {
        margin-left: 10px;
      }
      div {
        flex: 1;

        img {
          width: 100%;
          height: 100px;
        }
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
</style>