<template>
  <div class="articles">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="文章详情" />
    <personal @onFollow="onFollow">
      <div slot="title_text_top">{{articleObj.aut_name}}</div>
      <div slot="title_text_bottom">{{articleObj.pubdate}}</div>
      <div class="personal_btn" slot="slot_button">
        <van-button 
        :type="articleObj.is_followed?'default':'info'" 
        :text="articleObj.is_followed?'已关注':'关注'">
        </van-button>
      </div>
    </personal>
    <div class="articles_content markdown-body" v-html="articleObj.content" ref="articlesImageRef">
    </div>
    <van-list 
    v-model="loading"
    :finished="finished"
    finished-text="我也是有底线的哦！"
    @load="onLoad"
    >
      <unit-item></unit-item>
    </van-list>
    <operation-bar @click.native='showImg'></operation-bar>

  </div>
</template>

<script>
import { getArticlesDetailData } from "../../utils/articles.js";
import { followUserData, cancelFollowUserData } from "../../utils/user.js";

import Personal from "../../components/Personal";
import OperationBar from "../../components/OperationBar";

import UnitItem from './components/UnitItem'
import { ImagePreview } from "vant";
import { log } from "util";
import { setTimeout } from "timers";
// import func from "./vue-temp/vue-editor-bridge.js";
export default {
  name: "Articles",
  data() {
    return {
      articleObj: {},
      Loading:false,
      finished:false,
      list:[]
    };
  },
  props: {},
  components: {
    Personal,
    OperationBar,
    UnitItem
  },
  created() {
    this.getArticlesDetail();
  },
  methods: {
    //关注，接口不行，无法进行数据持久化
    // 逻辑是：登录的情况下，传入文章用户的id，关注用户与取消关注用户的接口会改变当前页面文章所属的用户id数据下的某个属性，比如is_followed，一般来说是布尔值，下次再加载此页面的时候，会保存上次改变的布尔值。
    async onFollow() {
      this.articleObj.is_followed = !this.articleObj.is_followed
      if (this.articleObj.is_followed) {
        await cancelFollowUserData(this.articleObj.aut_id);
      } else {
        await followUserData(this.articleObj.aut_id);
      }
    },
    async getArticlesDetail() {
      const { data } = await getArticlesDetailData(
        this.$route.params.article_id
      );
      this.articleObj = data.data;
      console.log(this.articleObj);
      this.ImagePreviewShow();
    },
    //预览图片
    ImagePreviewShow() {
      this.$nextTick(() => {
        const image = this.$refs.articlesImageRef.querySelectorAll("img");
        const imageList = [];
        image.forEach((item, index) => {
          imageList.push(item.src);
          item.onclick = () => {
            console.log(imageList.length);
            ImagePreview({
              images: imageList,
              startPosition: index,
              closeIconPosition: "top-left"
            });
          };
        });
      });
    },
    onLoad() {
      
    },

  }
};
</script>
<style scoped lang='less'>
@color_b: #439ffa;
.articles {
  position: relative;
  .personal {
    ::v-deep .van-image {
      width: 55px;
      height: 55px;
    }

    ::v-deep .van-button {
      width: 70px;
      height: 30px;
      color: black;
      font-size: 8px;
      border-radius: 30px;
      padding: 0;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
  .articles_content {
    padding: 0 15px;
  }
}
</style>