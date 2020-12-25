<template>
  <div class="comment_popup">

    <van-cell class="currentItem_cell">
      <unit-item :results="currentItem" />
    </van-cell>

    <van-cell-group>
      <van-cell title="全部回复" />
    </van-cell-group>
    <van-list v-model="loading" :finished="finished" finished-text="我也是有底线的哦！" @load="getArticlesComment">
      <van-cell v-for="(results,index) in resList" :key="index">
        <unit-item :results="results" />
      </van-cell>
    </van-list>

    <div class="bottom_button">
      <van-button round @click="onCommentReply">回复评论</van-button>
    </div>

    <van-action-sheet v-model="addCommentShow" title="回复评论" @close="onCommentPopupSheet">
      <add-comments @onRelease="onRelease" />
    </van-action-sheet>

  </div>
</template>

<script>
import UnitItem from "./UnitItem";
import AddComments from "./AddComments";
import { addReply } from "@/utils/reply";
import { getArticlesCommentData } from "@/utils/comment";

import { setInterval, setTimeout } from "timers";

export default {
  name: "CommentPopup",
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      currentList: [],
      replyList: [],
      resList: [],
      addCommentShow: false
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
  watch: {
    commentShow(val) {
      this.show = val;
    },
    currentItem(val) {
      console.log(val.com_id);
    }
  },
  mounted() {
    console.log(this.currentItem);
  },
  destroyed() {
    console.log("组件已经销毁");
  },

  methods: {
    //获取评论的回复
    async getArticlesComment() {
      const { data } = await getArticlesCommentData({
        type: "c",
        source: this.currentItem.com_id
      });
      const { results, total_count } = data.data;
      this.resList.push(...results);
      if (this.resList < total_count) {
        this.loading = false;
      } else {
        this.finished = true;
        console.log("已经没有更多回复");
      }
    },
    //回复评论
    async onRelease(mes) {
      try {
        const { data } = await addReply({
          target: this.currentItem.com_id,
          content: mes,
          art_id: this.artId
        });
        console.log(data);
        const { new_obj } = data.data;
        this.resList.unshift(new_obj);
        mes = "";
        this.addCommentShow = false;
      } catch (err) {
        console.log(err);
      }
    },
    onCommentReply() {
      this.addCommentShow = true;
    },
    onCommentPopupSheet() {
      this.addCommentShow = false;
    }
  }
};
</script>
<style scoped lang='less'>
.van-action-sheet {
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
    background-color: white;
    .van-button {
      width: 60%;
      height: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>