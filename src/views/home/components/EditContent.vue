<template>
  <div class="edit">
    <div class="popup_wrap">
      <div class="popup_my popup_channels">
        <div class="popup_my_header popup_header">
          <span class="header_text my_header_text">我的频道</span>
          <van-button :class="{btnColor:isEditDelete}" v-if="!isEditAdd" @click="editDeleteClick" round type="info">
            {{isEditDelete?'完成':'编辑'}}</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item v-for="(myChannel,index) in userChannel" :key="index">
            <div @click="closeDialog(index)" :class="['grid-item_text',
            {disable:isEditDelete || isEditAdd},
            index === isActive? 'select':null]">{{myChannel.name}}
            </div>
            <van-icon class="van-icon_delete" @click="deleteChannel(myChannel,index)" v-show="isEditDelete" :name="index !== 0 ? 'clear':null" />
          </van-grid-item>
        </van-grid>
      </div>
      <div class="popup_recommend popup_channels">
        <div class="popup_recommend_header popup_header">
          <span class="header_text recommend_header_text">推荐频道</span>
          <van-button :class="{btnColor:isEditAdd}" v-if="!isEditDelete" @click="editAddClick" round type="info">
            {{isEditAdd?'完成':'编辑'}}</van-button>
        </div>
        <van-grid :gutter="10">
          <van-grid-item v-for="(recommendChannel,index) in recommend" :key="index" icon="photo-o" text="文字">
            <van-icon @click="addChannel(recommendChannel)" class="van-icon_add" v-show="isEditAdd" name="add-o" /> {{recommendChannel.name}}
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllChannelsData,
  setUserChannelsData,
  modifyUserChannelsData
} from "@/utils/home.js";
import { getItem, setItem } from "@/utils/storage.js";
import { mapState } from "vuex";

export default {
  name: "EditContent",
  data() {
    return {
      allChannel: [],
      isEditDelete: false,
      isEditAdd: false,
      isActive: 0,
      editDeleteText: "编辑",
      editAddText: "编辑"
    };
  },
  props: {
    userChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getAllChannels();
    this.isActive = this.active;
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
    },
    ...mapState(["user"])
  },
  methods: {
    closeDialog(index) {
      this.isActive = index;
      this.$emit("closeDialog", index);
    },
    // 显示删除频道图标
    editDeleteClick() {
      this.isEditDelete = !this.isEditDelete;
    },
    //显示添加频道图标
    editAddClick() {
      this.isEditAdd = !this.isEditAdd;
    },
    //删除频道
    deleteChannel(myChannel, index) {
      if (index < this.isActive) {
        this.isActive = this.isActive - 1;
      }

      this.userChannel.splice(index, 1);
      console.log(myChannel);
    },
    //添加频道
    async addChannel(recommendChannel) {
      this.userChannel.push(recommendChannel);
      if (this.user) {
        try {
          // const {data} = await modifyUserChannelsData({
          //   id: recommendChannel.id,
          //   seq: this.userChannel.length
          // });
           await modifyUserChannelsData({
            id: recommendChannel.id, // 频道ID
            seq: this.userChannel.length // 序号
          })
          // console.log(data);
        } catch (err) {
          this.$toast.error('失败');
          console.log('失败');
        }
      }

      // console.log(channels);
    },
    //请求获取全部频道数据
    async getAllChannels() {
      const { data } = await getAllChannelsData();
      const { channels } = data.data;
      this.allChannel = channels;
    }
  }
};
</script>
<style scoped lang="less">
@color: #1989fa;
.edit {
  .select {
    // border: 1px solid @color;
    color: @color;
  }
  .grid-item_text {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }
  .disable {
    pointer-events: none;
  }
  .btnColor {
    border: 1px solid red;
    color: red !important ;
  }
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
          color: @color;
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
    }
    .popup_my {
      .van-icon_delete {
        top: -6px;
        right: -6px;
        z-index: 2;
        color: red;
      }
    }
    .popup_recommend {
      ::v-deep .van-grid-item__content {
        .van-icon_add {
          top: -6px;
          left: 0;
          z-index: 2;
          color: @color;
        }
      }
    }
  }
}
</style>