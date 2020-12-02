<template>
  <div class="articles">
    <van-nav-bar left-arrow @click-left="$router.go(-1)" />
  </div>
</template>

<script>
import { getArticlesDetailData } from "../../utils/articles.js";
export default {
  name: "Articles",
  data() {
    return {};
  },
  props: {},
  created() {
    this.getArticlesDetail();
  },
  methods: {
    async getArticlesDetail() {
      const {data} = await getArticlesDetailData("1324011841482915800");
      console.log(data);
    }
  }
};
</script>
<style scoped>
</style>