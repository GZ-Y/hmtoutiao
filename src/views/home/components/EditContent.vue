<template>
  <div class="edit">
    <div class="popup_wrap">
      <div class="popup_my popup_channels">
        <div class="popup_my_header popup_header">
          <span class="header_text my_header_text">我的频道</span>
          <van-button @click="editClick" round type="info">{{editText}}</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item v-for="(myChannel,index) in userChannel" :key="index">
            <van-icon @click="deleteChannel(index)" v-show="isEditBtn" :name="index !== 0 ? 'clear':null" /> {{myChannel.name}}
          </van-grid-item>
        </van-grid>
      </div>
      <div class="popup_recommend popup_channels">
        <div class="popup_recommend_header popup_header">
          <span class="header_text recommend_header_text">推荐频道</span>
          <van-button round type="info">编辑</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item v-for="recommendChannel in recommend" :key="recommendChannel.id" icon="photo-o" text="文字">
            {{recommendChannel.name}}
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllChannelsData } from "../../../utils/home.js";

export default {
  name: "EditContent",
  data() {
    return {
      allChannel: [],
      isEditBtn: false,
      editText: "编辑"
    };
  },
  props: {
    userChannel: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels();
  },
  computed: {
    recommend() {
      //这样的数组去重不可以去除掉多余的对象。
      // return !this.allChannel.filter((e, i) => {
      //   return this.userChannel.indexOf(e.name) === i;
      // });
      return this.allChannel.filter(all => {
        //这里的find循环后如果有条件则会返回true，所以在这里取反。
        return !this.userChannel.find(user => {
          return all.id === user.id;
        });
      });
    }
  },
  methods: {
    // 显示删除频道图标
    editClick() {
      this.isEditBtn = !this.isEditBtn;
      // this.editText = "完成";
      if (this.isEditBtn) {
        this.editText = "完成";
      } else {
        this.editText = "编辑";
      }
    },
    //删除频道
    deleteChannel(index) {
      if (index === 0) {
        return false;
      }
      this.userChannel.splice(index, 1);
    },
    async getAllChannels() {
      const { data } = await getAllChannelsData();
      const { channels } = data.data;
      this.allChannel = channels;
    }
  }
};
</script>
<style scoped lang="less">
.edit {
  .popup_wrap {
    padding: 55px 15px 0 15px;
    // position: relative;
    .popup_channels {
      margin-bottom: 38px;
      .popup_header {
        position: relative;
        margin-bottom: 25px;
        .header_text {
          font-size: 17px;
        }
        ::v-deep .van-button--normal {
          height: 20px;
          font-size: 13px;
          position: absolute;
          right: 15px;
          bottom: 0;
          height: 10;
          padding: 0 5px;
          background-color: white;
          color: #1989fa;
        }
      }
    }

    ::v-deep .van-grid-item__content {
      padding-left: 0;
      padding-right: 0;
      font-size: 13px;
    }
    ::v-deep .van-icon {
      position: absolute;
      top: -6px;
      right: -6px;
      z-index: 2;
      color: red;
    }
  }
}
</style>