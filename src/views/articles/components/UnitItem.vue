<template>
  <div class="unit-item">
    <div class="comment_wrap">
      <personal>
        <div slot="images">
          <van-image round contain :src="results.aut_proto" />
        </div>
        <div slot="title_text_top">{{results.aut_name}}</div>
        <div slot="title_text_bottom">{{results.content}}</div>
        <div class="personal_btn" slot="slot_button">
          <van-icon :name="results.is_like?'good-job':'good-job-o'" :badge="results.like_count" :color="results.is_like?'red':''" @click="onFabulous(results,index)" />
        </div>
        <div class="reply">
          <span>{{results.pubdate}}</span>
          <van-button size='mini' round @click="onCommentPopup(results)">回复{{results.reply_count}}</van-button>
        </div>
      </personal>
    </div>
  </div>
</template>

<script>
import Personal from "@/components/Personal";

export default {
  name: "unitItem",
  data() {
    return {
      attitudeSon: 0,
      commentList: []
    };
  },
  props: {
    results: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    Personal
  },
  methods: {
    onCommentPopup(index) {
      this.$emit("onCommentPopup", index);
    },
    onFabulous(item, index) {
      this.$emit("onFabulous", item, index);
    }
  }
};
</script>
<style scoped lang='less'>
.unit-item {
  .comment_wrap {
    height: 115px;
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
        margin-right: 32.00025px;
        font-size: medium;
        /deep/ .van-info {
          top: -7px;
          right: 7px;
        }
      }
      .reply {
        position: absolute;
        bottom: 0;
        left: 55px;
        transform: translateY(50%);
        span {
          font-size: 13px;
        }
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