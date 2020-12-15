<template>
  <div class="info">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image width="30px" height="30px" fit round :src="perInfo.photo"></van-image>
      </van-cell>
      <van-cell title="昵称" :value="perInfo.name" is-link @click="nameShow = true">
      </van-cell>
      <van-cell title="姓别" :value="perInfo.gender===0?'男':'女'" is-link @click="sexShow = true" />
      <van-cell title="生日" :value="perInfo.birthday" is-link @click="ageShow = true"/>
    </van-cell-group>

    <!-- 修改昵称 -->
    <van-popup v-model="nameShow" position="top" :style="{ height: '100%' }" get-container=".info">
      <van-nav-bar title="修改昵称" left-text="取消" right-text="确定" @click-left="nameShow = false" @click-right="onRightText" />
      <van-field v-model="perInfo.name" rows="2" autosize type="textarea" maxlength="10" placeholder="请输入留言" show-word-limit />
    </van-popup>

    <!-- 修改性别 -->
    <van-popup v-model="sexShow" position="bottom" :style="{ height: '50%' }">
      <van-picker title="姓别" show-toolbar :columns="sex" :default-index="perInfo.gender" @confirm="onConfirm" @cancel="onCancel" @change="onChange" />
    </van-popup>

    <!-- 修改年龄 -->
    <van-popup v-model="ageShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirmDate" @cancel="onCancelDate" @change="onChangeDate"/>
    </van-popup>

  </div>
</template>

<script>
import { getPerInfoData, editPerInfoData } from "@/utils/user";

export default {
  name: "Info",
  data() {
    return {
      nameShow: false,
      sexShow: false,
      ageShow:false,
      message: "",
      perInfo: {},
      sex: ["男", "女"],
      sexIndex: 0,
      currentDate:new Date(),
      minDate: new Date(1971, 0, 0),
      maxDate: new Date(2020,11,31)
    };
  },
  created() {
    this.getPerInfo();
  },
  methods: {
    onConfirmDate(val){
      console.log(val);
    },
    onCancelDate(){},
    onChangeDate(picker,item){
      
    },
    async onConfirm() {
      this.sexShow = false;
      const { data } = await editPerInfoData({
        gender: this.sexIndex
      });
      this.getPerInfo();
    },
    onCancel() {
      this.sexShow = false;
    },
    onChange(picker, value, index) {
      this.sexIndex = index;
    },
    async onRightText() {
      this.nameShow = false;
      try {
        await editPerInfoData({
          name: this.perInfo.name
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getPerInfo() {
      const { data } = await getPerInfoData();
      console.log(data);
      this.perInfo = data.data;
    },
    //挂载弹出层，要注意挂载的地方，不然可能导致样式无效
    getContainer() {
      return document.querySelector(".info");
    }
  }
};
</script>
<style scoped lang="less">
@color_b: #439ffa;
@color_f: #f5f7f9;
.info {
  /deep/ .van-popup {
    background-color: @color_f;
    .van-nav-bar {
      /deep/ .van-nav-bar__content {
        background-color: white;
        /deep/ .van-nav-bar__text {
          color: @color_b;
        }
        /deep/ .van-nav-bar__title {
          color: black;
        }
      }
    }
    .van-field {
      background-color: @color_f;
      /deep/ .van-field__control {
        height: 100px !important;
        background-color: white;
      }
      /deep/ .van-field__word-limit {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>