<template>
  <div class="articles">
    <!-- 顶部Tab栏 -->
    <van-nav-bar left-arrow @click-left="$router.back()" title="文章详情" />

    <!-- 个人信息区 -->
    <personal @onFollow="onFollow">
      <div slot="images">
        <van-image round :src="articleObj.aut_photo" />
      </div>
      <div slot="title_text_top">{{articleObj.aut_name}}</div>
      <div slot="title_text_bottom">{{articleObj.pubdate}}</div>
      <div class="personal_btn" slot="slot_button">
        <van-button :type="articleObj.is_followed?'default':'info'" :text="articleObj.is_followed?'已关注':'关注'">
        </van-button>
      </div>
    </personal>

    <!-- 中间滚动内容区 -->
    <div class="scroll">
      <div class="articles_content markdown-body" v-html="articleObj.content" ref="articlesImageRef">
      </div>
      <van-cell-group>
        <van-cell class="allcomment_cell" title="全部评论" />
      </van-cell-group>
      <div class="reply_list">
        <van-list v-model="loading" :finished="finished" finished-text="我也是有底线的哦！" @load="onLoad">
          <van-cell v-for="(results,index) in unitList" :key="index">
            <unit-item :results="results" :attitude="articleObj.attitude" @onFabulous="onFabulous" @onCommentPopup='onCommentPopup' />
          </van-cell>
        </van-list>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <operation-bar @writeComment='writeComment' />

    <!-- 添加评论面板 -->
    <van-action-sheet v-model="addCommentShow" title="评论" @close="onClose">
      <add-comments @onClose="onClose($event)" @onRelease="onRelease" />
    </van-action-sheet>

    <!-- 当前评论项回复面板 -->
    <van-action-sheet class="reply_comment" v-model="replyCommentShow" title="回复评论">
      <comment-popup v-if="replyCommentShow" :current-item="currentItem" :art-id="articleObj.art_id" />
    </van-action-sheet>
  </div>
</template>

<script>
import { getArticlesDetailData } from "@/utils/articles";
import { followUserData, cancelFollowUserData } from "@/utils/user";
import { getArticlesCommentData } from "@/utils/comment";
import { addReplyFabulous, deleteReplyFabulous, addReply } from "@/utils/reply";

import Personal from "@/components/Personal";
import OperationBar from "./components/OperationBar";

import UnitItem from "./components/UnitItem";
import AddComments from "./components/AddComments";
import CommentPopup from "./components/CommentPopup";

import { mapState } from "vuex";

import { ImagePreview } from "vant";
// import { log } from "util";
// import { setTimeout, setInterval } from "timers";
export default {
  name: "Articles",
  data() {
    return {
      articleObj: {},
      unitList: [],
      currentItem: {},
      loading: false,
      finished: false,
      //回复面板弹出层
      addCommentShow: false,
      replyCommentShow: false,
      destruction: false,
      currentIndex: 0
    };
  },
  props: {},
  components: {
    Personal,
    OperationBar,
    UnitItem,
    AddComments,
    CommentPopup
  },

  created() {
    this.getArticlesDetail();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    // 关闭添加评论面板
    onClose() {
      this.isAddCommentShow = !this.isAddCommentShow;
    },
    //显示评论弹出层面板
    onCommentPopup(res) {
      this.currentItem = res;
      this.replyCommentShow = !this.replyCommentShow;
    },
    // onCommentPopupSheet(show) {
    //   this.isCommentsPopupShow = show;
    //   this.destruction = show;
    // },
    //对文章添加评论
    async onRelease(mes) {
      try {
        const { data } = await addReply({
          target: this.articleObj.art_id,
          content: mes
        });
        const { new_obj } = data.data;
        console.log(new_obj);
        new_obj.is_like = false;
        this.unitList.unshift(new_obj);
        this.addCommentShow = false;
        mes = "";
        console.log("评论添加成功");
      } catch (err) {
        if (err.request.status === 401) {
          this.$toast.loading({
            message: "登录已经过期，请重新登录",
            duration: 1500,
            onClose: () => {
              this.$router.push("/login");
            }
          });
        }
      }
    },
    //评论点赞接口
    async onFabulous(item, index) {
      if (this.user) {
        if (!this.unitList[index].is_like) {
          await addReplyFabulous(item.com_id);
          this.unitList[index].like_count++;
        } else {
          await deleteReplyFabulous(item.com_id);
          this.unitList[index].like_count--;
        }
        this.unitList[index].is_like = !this.unitList[index].is_like;
      } else {
        this.$toast.loading({
          message: "请登录再进行操作",
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            this.$router.push("/login");
          }
        });
      }
    },
    //子组件面板显示与隐藏
    writeComment() {
      if (this.user) {
        this.addCommentShow = !this.addCommentShow;
      } else {
        this.$toast.loading({
          message: "请先登录再进行评论",
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            this.$router.push("/my");
          }
        });
      }
    },
    //子组件传递过来的布尔值
    onClose(show) {
      this.isAddCommentShow = show;
    },
    //文章内容
    async getArticlesDetail() {
      const { data } = await getArticlesDetailData(
        this.$route.params.article_id
      );
      this.articleObj = data.data;
      this.ImagePreviewShow();
    },
    //加载文章评论
    onLoad() {
      setTimeout(async () => {
        try {
          const { data } = await getArticlesCommentData({
            type: "a",
            source: this.articleObj.art_id
          });
          this.unitList.push(...data.data.results);
          const { total_count } = data.data;
          if (this.unitList.length < total_count) {
            this.loading = false;
          } else {
            console.log("停止加载");
            this.finished = true;
          }
        } catch (err) {
          console.log("停止加载");
          this.finished = true;
        }
      }, 300);
    },
    //关注，接口不行，无法进行数据持久化
    // 逻辑是：登录的情况下，传入文章用户的id，关注用户与取消关注用户的接口会改变当前页面文章所属的用户id数据下的某个属性，比如is_followed，一般来说是布尔值，下次再加载此页面的时候，会保存上次改变的布尔值。
    async onFollow() {
      this.articleObj.is_followed = !this.articleObj.is_followed;
      if (this.articleObj.is_followed) {
        await cancelFollowUserData(this.articleObj.aut_id);
      } else {
        await followUserData(this.articleObj.aut_id);
      }
    },
    //预览图片
    ImagePreviewShow() {
      this.$nextTick(() => {
        const image = this.$refs.articlesImageRef.querySelectorAll("img");
        const imageList = [];
        image.forEach((item, index) => {
          imageList.push(item.src);
          item.onclick = () => {
            console.log(imageList.length);
            ImagePreview({
              images: imageList,
              startPosition: index,
              closeIconPosition: "top-left"
            });
          };
        });
      });
    }
  }
};
</script>
<style scoped lang='less'>
@color_b: #439ffa;
.articles {
  position: relative;
  .personal {
    /deep/ .h_content{
      padding-left:15px;
      padding-right:15px;
    }
    ::v-deep .van-image {
      width: 55px;
      height: 55px;
    }

    ::v-deep .van-button {
      width: 70px;
      height: 30px;
      color: black;
      font-size: 8px;
      border-radius: 30px;
      padding: 0;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
  .scroll {
    position: fixed;
    top: 131px;
    bottom: 43px;
    left: 0;
    right: 0;
    padding: 0 15px;
    overflow-y: auto;
    /deep/ .van-cell.allcomment_cell{
      padding: 10px 0;
    }
    /deep/ .van-cell {
      padding: 0;
    }
    .reply_list {
      position: relative;
      bottom: 0;
      /deep/ .van-list__finished-text {
        background-color: #ebeced;
      }
      .all_comment {
        font-size: 15px;
        padding: 10px 0;
        border-top: 1px solid #e2e3e4;
        border-bottom: 1px solid #e2e3e4;
      }
    }
  }
  /deep/ .add_comments {
    /deep/ .van-field__control {
      width: 80%;
      border-bottom: 1px solid #999;
    }
    /deep/ .van-button {
      position: absolute;
      top: 50%;
      right: 5px;
      transform: translateY(-50%);
    }
  }
  .reply_comment {
    height: 100%;
  }
}
</style>