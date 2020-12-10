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
          <van-button size='mini' text="回复" round></van-button>
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
  .van-cell {
    height: 115px;
    border-bottom:1px solid #999;
    // overflow: auto;
    .personal {
      /deep/ .van-image {
        width: 45px;
        height: 45px;
      }
      /deep/ .van-icon {
        position: absolute;
        top: 30px;
        right: 0px;
        transform: translateY(-100%);
      }
      .reply {
        position: absolute;
        bottom: 0;
        left: 55px;
        transform: translateY(50%);
        .van-button {
          width: 67px;
          height: 25px;
          line-height: 25px;
          margin-left: 12px;
          background-color: #F4F5F6;
        }
      }
    }
  }
}
</style>