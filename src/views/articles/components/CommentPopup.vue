<template>
  <div class="comment_popup">
    <van-action-sheet v-model="show" title="回复评论" @close="onCommentPopupSheet">
      <div class="content">
        <unit-item></unit-item>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import UnitItem from "./UnitItem";

export default {
  name: "CommentPopup",
  data() {
    return {
      show: false
    };
  },
  props: {
    commentShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UnitItem
  },
  watch:{
    commentShow(val){
      this.show = val
    }
  },
  methods:{
    onCommentPopupSheet(){
      this.$emit('onCommentPopupSheet',this.show)
    }
  }
};
</script>
<style scoped lang='less'>
.van-action-sheet {
  height: 100%;
}
</style>