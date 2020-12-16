<template>
  <div class="comment_popup">
    <van-action-sheet v-model="show" title="回复评论" @close="onCommentPopupSheet">
      <div class="content">
        <unit-item :unit-list="currentList">
          <div class="all_reply" slot="all_reply">全部回复</div>
        </unit-item>
      </div>

      <unit-item :unit-list="replyList"></unit-item>

      <div class="bottom_button">
        <van-button round @click="onCommentReply">回复评论</van-button>
      </div>
      <add-comments :comment-show="isCommentReplyShow" @onCloseCommentReply="onCloseCommentReply" @onRelease="onRelease" />
    </van-action-sheet>
  </div>
</template>

<script>
import UnitItem from "./UnitItem";
import AddComments from "./AddComments";
import { addReply } from "@/utils/reply.js";
import { setInterval } from "timers";

export default {
  name: "CommentPopup",
  data() {
    return {
      show: false,
      isCommentReplyShow: false,
      currentList: [],
      replyList: []
    };
  },
  props: {
    commentShow: {
      type: Boolean,
      default: false
    },
    artId: {
      // type: Number,
      required: true
    },
    currentItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    UnitItem,
    AddComments
  },
  created() {},
  watch: {
    commentShow(val) {
      this.show = val;
    },
    currentItem(val) {
      this.currentList = [];
      this.currentList.push(val);
    }
  },
  methods: {
    //回复评论
    async onRelease(mes) {
      console.log("回复评论成功");
      const { data } = await addReply({
        target: this.currentItem.aut_id,
        content: mes,
        art_id: this.artId
      });
      console.log(data);
      const { new_obj } = data.data;
      this.replyList.unshift(new_obj);
      this.isCommentReplyShow = false
    },
    onCloseCommentReply(show) {
      this.isCommentReplyShow = show;
    },
    onCommentReply() {
      this.isCommentReplyShow = !this.isCommentReplyShow;
    },
    onCommentPopupSheet() {
      this.$emit("onCommentPopupSheet", this.show);
    }
  }
};
</script>
<style scoped lang='less'>
.van-action-sheet {
  height: 100%;
  /deep/ .van-cell {
    border-bottom: none;
    .h_content {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .all_reply {
    font-size: 15px;
    padding: 10px 0;
    border-top: 1px solid #e2e3e4;
    border-bottom: 1px solid #e2e3e4;
  }
  .bottom_button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 0;
    border-top: 1px solid #999;
    .van-button {
      width: 60%;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>