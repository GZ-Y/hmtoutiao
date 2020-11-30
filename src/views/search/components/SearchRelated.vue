<template>
  <!-- 相关搜索 -->
  <div class="search-related">
    <van-cell-group>
      <van-cell v-for="(Lenovo,index) in optionsList" :key="index" :title="Lenovo" />
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchRelatedData } from "../../../utils/search.js";
import { debounce } from "lodash";

export default {
  name: "SearchRelated",
  data() {
    return {
      optionsList: []
    };
  },
  props: {
    related: {
      type: String,
      required: true
    }
  },

  watch: {
    related: {
      handler: debounce(async function() {
        console.log(this.related);
        if (this.related !== "") {
          const { data } = await getSearchRelatedData(this.related);
          let { options } = data.data;
          this.optionsList = options;
        }
      }, 500),
      immediate: true
      // async handler(){
      //   console.log(this.related);
      //   const {data} = await getSearchRelatedData(this.related);
      //   console.log(data);
      // }
    }
  },
  methods: {
    // getSearchRelated(){
    // }
  }
};
</script>
<style scoped>
</style>