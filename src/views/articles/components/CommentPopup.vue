<template>
  <div class="comment-popup">
    <van-action-sheet v-model="show" title="标题" @close="onClose">
      <div class="content">
        <van-field v-model.trim="message" rows="2" type="textarea" maxlength="50" placeholder="请输入您的评论内容" show-word-limit />
        <van-button type="default" text="发布" size='small'></van-button>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: "CommentPopup",
  data() {
    return {
      show: false,
      message: ""
    };
  },
  props: {
    commentShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    commentShow(val) {
      this.show = val;
    }
  },
  methods: {
    onClose() {
      this.message = ''
      this.$emit("onClose", this.show);
    }
  }
};
</script>
<style scoped>
</style>