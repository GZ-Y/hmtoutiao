<template>
  <div class="unit-item">
    <div class="all_reply">全部评论</div>
    <van-cell v-for="(res,index) in unitList" :key="index">
      <personal>
        <div slot="title_text_top">{{res.aut_name}}</div>
        <div slot="title_text_bottom">{{res.content}}</div>
        <div class="personal_btn" slot="slot_button">
          <van-icon :name="fabulousShow?'good-job':'good-job-o'" :color="fabulousShow?'red':''" @click="onFabulous(res)" />
        </div>
        <div class="reply">
          <span>{{res.pubdate}}</span>
          <van-button size='mini' round @click="onCommentPopup">回复{{res.reply_count}}</van-button>
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
  props: {
    unitList: {
      type: Array,
      default() {
        return [];
      }
    },
    fabulousShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Personal
  },
  methods: {
    onCommentPopup(){
      this.$emit('onCommentPopup')
    },
    onFabulous(item) {
      this.$emit("onFabulous", item);
    }
  }
};
</script>
<style scoped lang='less'>
.unit-item {
  .all_reply{
    font-size: 15px;
    padding: 10px 0;
    border-top:1px solid #E2E3E4;
    border-bottom:1px solid #E2E3E4;
  }
  .van-cell {
    height: 115px;
    border-bottom: 1px solid #999;
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
          background-color: #f4f5f6;
        }
      }
    }
  }
}
</style>