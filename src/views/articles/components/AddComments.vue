<template>
  <div class="add_comments">
    <van-action-sheet v-model="show" title="标题" @close="onClose">
      <div class="content">
        <van-field v-model.trim="message" rows="2" type="textarea" maxlength="50" placeholder="请输入您的评论内容" show-word-limit />
        <van-button type="default" text="发布" size='small' :disabled="disabled" @click="onRelease"></van-button>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: "AddComments",
  data() {
    return {
      show: false,
      message: "",
      disabled: false
    };
  },
  props: {
    commentShow: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.disabled = true;
  },
  watch: {
    commentShow(val) {
      this.show = val;
    },
    message(val) {
      this.disabled = val === "" ? true : false;
    }
  },
  methods: {
    onClose() {
      this.message = "";
      this.$emit("onClose", this.show);
    },
    onRelease() {
      this.$emit("onRelease", this.message);
    }
  }
};
</script>
<style scoped>
</style>