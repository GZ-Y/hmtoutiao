<template>
  <!-- 相关搜索 -->
  <div class="search-related">
    <van-cell-group>
      <van-cell v-for="(Lenovo,index) in optionsList" :key="index" >
        <div slot="title" v-html="relatedText(Lenovo)" @click="$emit('onRelated',Lenovo)"></div>
      </van-cell>
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
      optionsList: [],
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
        if (this.related.length !== 0 && this.related.trim()) {
          const { data } = await getSearchRelatedData(this.related);
          let { options } = data.data;
          this.optionsList = options;
        }
      }, 500),
      immediate: true
    },
    
  },
  methods: {
    relatedText(value){
      return value.replace(new RegExp(this.related,'ig'),
      `<span style='color:#439ffa'>${this.related}</span>`);
    }
  }
};
</script>
<style scoped>
</style>