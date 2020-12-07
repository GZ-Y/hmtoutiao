<template>
  <div class="articles">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="文章详情" />
    <personal>
      <div slot="title_text_top">{{articleObj.aut_name}}</div>
      <div slot="title_text_bottom">{{articleObj.pubdate}}</div>
      <div class="personal_btn" slot="slot_button">关注</div>
    </personal>
    <div class="articles_content markdown-body" v-html="articleObj.content" ref="articlesImageRef">
    </div>
    <operation-bar @click.native='showImg'></operation-bar>
  </div>
</template>

<script>
import { getArticlesDetailData } from "../../utils/articles.js";
import Personal from "../../components/Personal";
import OperationBar from "../../components/OperationBar";
import { ImagePreview } from "vant";
// import func from "./vue-temp/vue-editor-bridge.js";
export default {
  name: "Articles",
  data() {
    return {
      articleObj: {}
    };
  },
  props: {},
  components: {
    Personal,
    OperationBar
  },
  created() {
    this.getArticlesDetail();
  },
  methods: {
    async getArticlesDetail() {
      const { data } = await getArticlesDetailData(
        this.$route.params.article_id
      );
      this.articleObj = data.data;
      this.$nextTick(() => {
        const image = this.$refs.articlesImageRef.querySelectorAll("img");
        const imageList = [];
        image.forEach((item, index) => {
          imageList.push(item.src);
          item.onclick = () => {
            console.log(imageList.length);
            ImagePreview({
              imageList,
              startPosition: index,
              closeIconPosition: "top-left"
            });
          };
        });
      });
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
      background-color: @color_b;
      width: 80px;
      height: 30px;
    }
  }
  .articles_content {
    padding: 0 15px;
  }
}
</style>