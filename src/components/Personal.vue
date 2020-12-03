<template>
  <div class="personal">
    <div class="h_content">
      <van-image  round :src="require('../assets/image/tgb.jpg')" />
      <div class="title_text">
        <div class="title_text_top">
          <slot name='title_text_top'></slot>
        </div>
        <div class="title_text_bottom">
          <slot name='title_text_bottom'></slot>
        </div>
      </div>
      <van-button type="default">
        <div slot="default">
          <slot name="slot_button"></slot>
        </div>
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {};
  }
};
</script>
<style scoped lang='less'>
.personal {
  .h_content {
    position: relative;
    box-sizing: border-box;
    padding: 15px;
    display: flex;

    .title_text {
      font-size: 15px;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
    ::v-deep .van-button {
      width: 60px;
      height: 17px;
      font-size: 5px;
      border-radius: 30px;
      padding: 0;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
}
</style>