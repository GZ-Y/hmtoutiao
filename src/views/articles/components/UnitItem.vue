<template>
  <div class="unit-item">
    <van-cell>
      <personal>
        <div slot="title_text_top">淘股吧，作手新一</div>
        <div slot="title_text_bottom">abcdefghijklmnopqrst</div>
        <div class="personal_btn" slot="slot_button">
          <van-icon name="good-job-o" />
        </div>
        <div class="reply">
          <span>12.09</span>
          <van-button text="回复"></van-button>
        </div>
      </personal>
    </van-cell>
  </div>
</template>

<script>
import Personal from "../../../components/Personal";

export default {
  name: "unitItem",
  data() {
    return {};
  },
  components: {
    Personal
  }
};
</script>
<style scoped lang='less'>
.unit-item {
  .personal {
    /deep/ .van-image {
      width: 45px;
      height: 45px;
    }
    /deep/ .van-icon{
      position: absolute;
      top: 30px;
      right: 15px;
      transform: translateY(-100%);
    }
    .reply {
      // flex:unset;
      position: absolute;
      bottom:0;
      left: 70px;
      transform: translateY(50%);
    }
  }
}
</style>