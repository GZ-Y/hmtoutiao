<template>
  <div class="articles">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" title="文章详情" />
    <personal>
      <div slot="title_text_top">淘股吧</div>
      <div slot="title_text_bottom"></div>
      <div class="personal_btn" slot="slot_button">关注</div>
    </personal>
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
    return {};
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
      const  data  = await getArticlesDetailData(
        this.$route.params.article_id
      );
      console.log(data);
    }
  }
};
</script>
<style scoped lang='less'>
@color_b: #439ffa;
.articles {
  .personal {
    ::v-deep .van-image {
      // transform: scale(-1,-1)
      width: 55px;
      height: 55px;
    }
    ::v-deep .van-button {
      background-color: @color_b;
      width: 80px;
      height: 30px;
    }
    .personal_btn {
    }
  }
}
</style>