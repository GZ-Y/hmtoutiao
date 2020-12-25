<template>
  <div class="add_comments">
    <van-field v-model.trim="message" rows="2" type="textarea" maxlength="50" placeholder="请输入您的评论内容" show-word-limit />
    <van-button type="default" text="发布" size='small' :disabled="disabled" @click="onRelease"></van-button>
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
    onRelease() {
      this.$emit("onRelease", this.message);
    }
  }
};
</script>
<style scoped>
</style>