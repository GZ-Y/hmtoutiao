<template>
  <div class="unit-item">
    <div class="all_comment">
      <slot name="all_comment"></slot>
    </div>
    <van-cell v-for="(res,index) in unitList" :key="index">
      <personal>
        <div slot="images">
          <van-image round contain :src="res.aut_proto"/>
        </div>
        <div slot="title_text_top">{{res.aut_name}}</div>
        <div slot="title_text_bottom">{{res.content}}</div>
        <div class="personal_btn" slot="slot_button">
          <van-icon :name="attitudeSon !== -1?'good-job':'good-job-o'" :badge="res.like_count" :color="attitudeSon !== -1?'red':''" @click="onFabulous(res)" />
        </div>
        <div class="reply">
          <span>{{res.pubdate}}</span>
          <van-button size='mini' round @click="onCommentPopup(index)">回复{{res.reply_count}}</van-button>
        </div>
      </personal>
    </van-cell>
    <div class="all_reply">
      <slot name="all_reply"></slot>
    </div>
  </div>
</template>

<script>
import Personal from "@/components/Personal";

export default {
  name: "unitItem",
  data() {
    return {
      attitudeSon:0
    };
  },
  props: {
    unitList: {
      type: Array,
      default() {
        return [];
      }
    },
    attitude: {
      // type: [Number,String,Object],
      required:true,
    }
  },
  watch:{
    attitude(val){
      console.log(val);
      this.attitudeSon = val
    }
  },
  components: {
    Personal
  },
  methods: {
    onCommentPopup(index){
      this.$emit('onCommentPopup',index)
    },
    onFabulous(item) {
      this.$emit("onFabulous", item);
    }
  }
};
</script>
<style scoped lang='less'>
.unit-item {
  .van-cell {
    height: 115px;
    border-bottom: 1px solid #999;
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
        /deep/ .van-info{
          top: -7px;
          right: 7px;
        }
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