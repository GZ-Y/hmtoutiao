<template>
  <!-- 相关搜索 -->
  <div class="search-related">
    <van-cell-group>
      <van-cell title="相关搜索1" />
    </van-cell-group>
  </div>
</template>

<script>
import { getSearchRelatedData } from "../../../utils/search.js";
import {debounce} from 'lodash'
import { log } from "util";
import { setInterval, setTimeout } from "timers";
export default {
  name: "SearchRelated",
  data() {
    return {
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
      async handler() {
        const data = debounce(await getSearchRelatedData({p:this.related}), 500)
        console.log(data);
      }
      // immediate: true
    }
  }
};
</script>
<style scoped>
</style>