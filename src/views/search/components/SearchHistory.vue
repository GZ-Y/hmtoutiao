<template>
  <!-- 搜索历史 -->
  <div class="search-history">
    <van-cell-group>
      <van-cell v-for="(history,index) in historyList" :key="index" :title="history">
        <div slot="default" v-show="closeShow">
          <van-icon name="close" @click="$emit('singleDelete',index)"></van-icon>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {};
  },
  props: {
    historyList: {
      type: Array,
      required: true
    },
    closeShow:{
      type:Boolean,
      default:false,
    }
  }
};
</script>
<style scoped>
</style>