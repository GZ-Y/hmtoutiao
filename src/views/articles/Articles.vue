<template>
  <div class="articles">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="文章详情" />
    <personal>
      <div slot="title_text_top">{{articleObj.aut_name}}</div>
      <div slot="title_text_bottom">{{articleObj.pubdate}}</div>
      <div class="personal_btn" slot="slot_button">关注</div>
    </personal>
    <div class="content markdown-body" v-html="articleObj.content"></div>
    <operation-bar></operation-bar>
  </div>
</template>

<script>
import { getArticlesDetailData } from "../../utils/articles.js";
import Personal from "../../components/Personal";
import OperationBar from "../../components/OperationBar";
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
      const {data} = await getArticlesDetailData(this.$route.params.article_id);
      this.articleObj = data.data;
      console.log(this.articleObj);
    }
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
}
</style>